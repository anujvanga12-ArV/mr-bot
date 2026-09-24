import { describe, expect, it } from "vitest";
import type { LessonQuiz } from "@/content/types";
import { scoreQuiz } from "./quiz-scoring";

const quiz: LessonQuiz = {
  slug: "test-quiz",
  questions: [
    {
      prompt: "2 + 2 = ?",
      options: [
        { id: "a", text: "3" },
        { id: "b", text: "4" },
      ],
      correctOptionId: "b",
      explanation: "Arithmetic.",
    },
    {
      prompt: "The sky is...",
      options: [
        { id: "a", text: "Blue (usually)" },
        { id: "b", text: "Green" },
      ],
      correctOptionId: "a",
      explanation: "Rayleigh scattering.",
    },
  ],
};

describe("scoreQuiz", () => {
  it("scores every correct answer", () => {
    const result = scoreQuiz(quiz, { "0": "b", "1": "a" });
    expect(result).toEqual({ score: 2, total: 2, correctByIndex: [true, true] });
  });

  it("scores partial credit", () => {
    const result = scoreQuiz(quiz, { "0": "a", "1": "a" });
    expect(result.score).toBe(1);
    expect(result.correctByIndex).toEqual([false, true]);
  });

  it("treats a missing answer as incorrect rather than throwing", () => {
    const result = scoreQuiz(quiz, { "0": "b" });
    expect(result.correctByIndex).toEqual([true, false]);
  });

  it("ignores extra or malformed keys in the answers object", () => {
    const result = scoreQuiz(quiz, { "0": "b", "1": "a", "99": "z", rogue: "b" });
    expect(result.score).toBe(2);
  });
});
