import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { profiles } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";
import { getLessonBySlug } from "@/services/course-service";
import { getConversationMessages, getOrCreateConversation } from "@/services/tutor-service";
import { ChatInterface } from "@/features/tutor/chat-interface";
import { EmptyState } from "@/components/ui/empty-state";
import type { ExplanationLevel } from "@/lib/ai-tutor/system-prompt";

export default async function TutorPage({
  searchParams,
}: {
  searchParams: Promise<{ lesson?: string }>;
}) {
  const { lesson: lessonSlug } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The (app) layout already redirects signed-out visitors.
  if (!user) return null;

  if (!env.ANTHROPIC_API_KEY) {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold">AI Tutor</h1>
        </div>
        <EmptyState
          title="The AI tutor isn't set up yet"
          description="Add an ANTHROPIC_API_KEY to your .env file to turn this on. Everything else in the app works without it."
        />
      </div>
    );
  }

  const [profile, lessonRow] = await Promise.all([
    db.query.profiles.findFirst({ where: eq(profiles.id, user.id) }),
    lessonSlug ? getLessonBySlug(lessonSlug) : Promise.resolve(null),
  ]);

  const conversation = await getOrCreateConversation(user.id, lessonRow?.id ?? null);
  const messages = await getConversationMessages(conversation.id, user.id);

  const defaultExplanationLevel: ExplanationLevel =
    profile?.learningLevel === "beginner" ? "simple" : "normal";

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold">AI Tutor</h1>
        <p className="text-muted-foreground">
          {lessonRow
            ? `Asking about: ${lessonRow.title}`
            : "Ask about anything you've learned so far."}
        </p>
      </div>
      <ChatInterface
        conversationId={conversation.id}
        initialMessages={messages.map((message) => ({
          role: message.role,
          content: message.content,
        }))}
        defaultExplanationLevel={defaultExplanationLevel}
      />
    </div>
  );
}
