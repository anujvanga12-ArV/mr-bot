import type { LessonQuiz } from "@/content/types";

export interface QuizResult {
  score: number;
  total: number;
  correctByIndex: boolean[];
}

/**
 * Grades answers against a quiz definition. `answers` is keyed by question
 * index ("0", "1", ...). Pure and synchronous on purpose — the caller
 * decides what to persist and where the quiz definition came from; this
 * function only ever trusts `quiz`, never anything from `answers` beyond
 * which option was picked.
 */
export function scoreQuiz(quiz: LessonQuiz, answers: Record<string, string>): QuizResult {
  const correctByIndex = quiz.questions.map(
    (question, index) => answers[String(index)] === question.correctOptionId,
  );

  return {
    score: correctByIndex.filter(Boolean).length,
    total: quiz.questions.length,
    correctByIndex,
  };
}
