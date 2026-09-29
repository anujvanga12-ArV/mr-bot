import Anthropic from "@anthropic-ai/sdk";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/client";
import { lessons, profiles } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";
import { buildSystemPrompt } from "@/lib/ai-tutor/system-prompt";
import { isWithinTutorRateLimit } from "@/lib/ai-tutor/rate-limit";
import {
  appendMessage,
  getConversationForUser,
  getConversationMessages,
} from "@/services/tutor-service";

const TUTOR_MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 1024;
// How much prior conversation to feed back as context. Keeps cost and
// latency bounded; a long-running conversation gracefully "forgets" its
// earliest turns rather than growing the request without limit.
const MAX_HISTORY_MESSAGES = 20;

const requestSchema = z.object({
  conversationId: z.string().uuid(),
  message: z.string().trim().min(1).max(2000),
  explanationLevel: z.enum(["simple", "normal", "technical"]),
});

export async function POST(request: Request) {
  if (!env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The AI tutor isn't configured yet — ANTHROPIC_API_KEY is missing." },
      { status: 503 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "You need to be signed in to use the tutor." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "That message couldn't be sent — try again." }, { status: 400 });
  }

  const { conversationId, message, explanationLevel } = parsed.data;

  const conversation = await getConversationForUser(conversationId, user.id);
  if (!conversation) {
    return Response.json({ error: "Conversation not found." }, { status: 404 });
  }

  if (!(await isWithinTutorRateLimit(user.id))) {
    return Response.json(
      { error: "You've reached the tutor's message limit for this hour. Try again a bit later." },
      { status: 429 },
    );
  }

  const [profile, history, lessonContext] = await Promise.all([
    db.query.profiles.findFirst({ where: eq(profiles.id, user.id) }),
    getConversationMessages(conversationId, user.id),
    conversation.lessonContextId
      ? db.query.lessons.findFirst({ where: eq(lessons.id, conversation.lessonContextId) })
      : Promise.resolve(null),
  ]);

  await appendMessage(conversationId, user.id, "user", message);

  const systemPrompt = buildSystemPrompt({
    learningLevel: profile?.learningLevel ?? "beginner",
    explanationLevel,
    lessonTitle: lessonContext?.title ?? null,
  });

  const recentHistory = history.slice(-MAX_HISTORY_MESSAGES);
  const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  const encoder = new TextEncoder();
  let fullResponse = "";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const anthropicStream = anthropic.messages
          .stream({
            model: TUTOR_MODEL,
            max_tokens: MAX_TOKENS,
            system: systemPrompt,
            messages: [
              ...recentHistory.map((entry) => ({
                role: entry.role,
                content: entry.content,
              })),
              { role: "user" as const, content: message },
            ],
          })
          .on("text", (text) => {
            fullResponse += text;
            controller.enqueue(encoder.encode(text));
          });

        await anthropicStream.finalMessage();
        await appendMessage(conversationId, user.id, "assistant", fullResponse);
        controller.close();
      } catch (error) {
        console.error("Tutor stream failed:", error);
        // The client only sees the connection end early; it shows its own
        // generic error message rather than us leaking error internals.
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
