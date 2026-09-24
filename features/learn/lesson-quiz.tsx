"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import type { LessonQuiz } from "@/content/types";
import { submitQuiz } from "@/features/learn/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { QuizResult } from "@/lib/quiz-scoring";

export function LessonQuizRunner({ quiz }: { quiz: LessonQuiz }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const allAnswered = quiz.questions.every((_, i) => answers[String(i)]);

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      try {
        const graded = await submitQuiz(quiz.slug, answers);
        setResult(graded);
      } catch {
        setError("Couldn't submit your answers — check your connection and try again.");
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Module review</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {result ? (
          <p className="rounded-md bg-secondary p-3 text-sm font-medium">
            You scored {result.score} out of {result.total}.
          </p>
        ) : null}

        {quiz.questions.map((question, index) => {
          const questionKey = String(index);
          const graded = result?.correctByIndex[index];

          return (
            <div key={questionKey} className="flex flex-col gap-2">
              <p className="whitespace-pre-wrap text-sm font-medium">
                {index + 1}. {question.prompt}
              </p>
              <div className="flex flex-col gap-2">
                {question.options.map((option) => {
                  const isSelected = answers[questionKey] === option.id;
                  const revealCorrect = result && option.id === question.correctOptionId;
                  const revealWrong = result && isSelected && graded === false;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={Boolean(result)}
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, [questionKey]: option.id }))
                      }
                      className={cn(
                        "rounded-md border px-4 py-2.5 text-left text-sm transition-colors disabled:cursor-default",
                        revealCorrect && "border-emerald-500/50 bg-emerald-500/10",
                        revealWrong && "border-destructive/50 bg-destructive/10",
                        !result && isSelected && "border-ring bg-secondary",
                        !result && !isSelected && "border-input hover:bg-secondary",
                      )}
                    >
                      <span className="flex items-start justify-between gap-3">
                        {option.text}
                        {revealCorrect ? (
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                        ) : null}
                        {revealWrong ? (
                          <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                        ) : null}
                      </span>
                    </button>
                  );
                })}
              </div>
              {result ? (
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              ) : null}
            </div>
          );
        })}

        {!result ? (
          <div>
            <Button type="button" disabled={!allAnswered || isPending} onClick={handleSubmit}>
              {isPending ? "Submitting…" : "Submit quiz"}
            </Button>
            {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
