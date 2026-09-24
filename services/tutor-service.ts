import "server-only";
import { and, asc, desc, eq, isNull } from "drizzle-orm";
import { db } from "@/db/client";
import { aiConversations, aiMessages } from "@/db/schema";

/**
 * Reuses the most recent conversation matching this lesson context (or the
 * most recent general one, if no lesson context) rather than creating a new
 * conversation on every page load.
 */
export async function getOrCreateConversation(userId: string, lessonId: string | null) {
  const existing = await db.query.aiConversations.findFirst({
    where: lessonId
      ? and(eq(aiConversations.userId, userId), eq(aiConversations.lessonContextId, lessonId))
      : and(eq(aiConversations.userId, userId), isNull(aiConversations.lessonContextId)),
    orderBy: desc(aiConversations.createdAt),
  });

  if (existing) {
    return existing;
  }

  const [created] = await db
    .insert(aiConversations)
    .values({ userId, lessonContextId: lessonId })
    .returning();

  if (!created) {
    throw new Error("Failed to create a tutor conversation.");
  }

  return created;
}

export async function getConversationForUser(conversationId: string, userId: string) {
  return db.query.aiConversations.findFirst({
    where: and(eq(aiConversations.id, conversationId), eq(aiConversations.userId, userId)),
  });
}

/**
 * Takes `userId` and verifies it via a join, rather than trusting that
 * every caller already checked ownership with `getConversationForUser` —
 * this is the actual authorization boundary for Drizzle-issued queries
 * (see the note in db/schema.ts on RLS vs. application-layer enforcement).
 */
export async function getConversationMessages(conversationId: string, userId: string) {
  return db
    .select({
      id: aiMessages.id,
      role: aiMessages.role,
      content: aiMessages.content,
      createdAt: aiMessages.createdAt,
    })
    .from(aiMessages)
    .innerJoin(aiConversations, eq(aiMessages.conversationId, aiConversations.id))
    .where(and(eq(aiMessages.conversationId, conversationId), eq(aiConversations.userId, userId)))
    .orderBy(asc(aiMessages.createdAt));
}

export async function appendMessage(
  conversationId: string,
  userId: string,
  role: "user" | "assistant",
  content: string,
) {
  const owned = await getConversationForUser(conversationId, userId);
  if (!owned) {
    throw new Error("Cannot append to a conversation that doesn't belong to this user.");
  }

  await db.insert(aiMessages).values({ conversationId, role, content });
}
