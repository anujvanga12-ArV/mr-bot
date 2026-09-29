import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { quizAttempts } from "@/db/schema";

export async function recordQuizAttempt(
  userId: string,
  quizSlug: string,
  score: number,
  total: number,
  answers: Record<string, string>,
) {
  const [attempt] = await db
    .insert(quizAttempts)
    .values({ userId, quizSlug, score, total, answers })
    .returning();
  return attempt;
}

export async function getLatestQuizAttempt(userId: string, quizSlug: string) {
  return db.query.quizAttempts.findFirst({
    where: and(eq(quizAttempts.userId, userId), eq(quizAttempts.quizSlug, quizSlug)),
    orderBy: desc(quizAttempts.createdAt),
  });
}
