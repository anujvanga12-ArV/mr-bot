"use server";

import { revalidatePath } from "next/cache";
import { findLessonLocation, getQuizBySlug } from "@/content/registry";
import { getLessonBySlug } from "@/services/course-service";
import { markLessonComplete } from "@/services/progress-service";
import { recordQuizAttempt } from "@/services/quiz-service";
import { evaluateProgressAwards, type ProgressAwards } from "@/services/skill-service";
import { createClient } from "@/lib/supabase/server";
import { scoreQuiz, type QuizResult } from "@/lib/quiz-scoring";

async function requireUserId(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You need to be signed in to do that.");
  }

  return user.id;
}

export async function completeLesson(lessonSlug: string): Promise<ProgressAwards> {
  const userId = await requireUserId();

  const lessonRow = await getLessonBySlug(lessonSlug);
  if (!lessonRow) {
    throw new Error(`No published lesson matches "${lessonSlug}".`);
  }

  await markLessonComplete(userId, lessonRow.id);

  const location = findLessonLocation(lessonSlug);
  const awards = location
    ? await evaluateProgressAwards(userId, location.courseSlug)
    : { newSkills: [], newAchievements: [] };

  revalidatePath("/dashboard");
  revalidatePath("/learn", "layout");

  return awards;
}

/**
 * `answers` is keyed by question index ("0", "1", ...) — the client only
 * ever sends which option it picked, never a score or a correctness claim.
 * Grading happens in `scoreQuiz`, against the same content file the quiz
 * was rendered from.
 */
export async function submitQuiz(
  quizSlug: string,
  answers: Record<string, string>,
): Promise<QuizResult> {
  const userId = await requireUserId();

  const quiz = getQuizBySlug(quizSlug);
  if (!quiz) {
    throw new Error(`No quiz matches "${quizSlug}".`);
  }

  const result = scoreQuiz(quiz, answers);

  await recordQuizAttempt(userId, quizSlug, result.score, result.total, answers);
  revalidatePath("/dashboard");

  return result;
}
