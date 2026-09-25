"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import type { KnowledgeCheckBlock } from "@/content/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function KnowledgeCheckBlockView({ block }: { block: KnowledgeCheckBlock }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = submitted && selectedId === block.correctOptionId;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Knowledge check</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm font-medium whitespace-pre-wrap">{block.prompt}</p>

        <div className="flex flex-col gap-2">
          {block.options.map((option) => {
            const isSelected = option.id === selectedId;
            const revealCorrect = submitted && option.id === block.correctOptionId;
            const revealWrong = submitted && isSelected && !isCorrect;

            return (
              <button
                key={option.id}
                type="button"
                disabled={submitted}
                onClick={() => setSelectedId(option.id)}
                className={cn(
                  "rounded-md border px-4 py-3 text-left text-sm transition-colors disabled:cursor-default",
                  revealCorrect && "border-emerald-500/50 bg-emerald-500/10",
                  revealWrong && "border-destructive/50 bg-destructive/10",
                  !submitted && isSelected && "border-ring bg-secondary",
                  !submitted && !isSelected && "border-input hover:bg-secondary",
                )}
              >
                <span className="flex items-start justify-between gap-3">
                  {option.text}
                  {revealCorrect ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  ) : null}
                  {revealWrong ? (
                    <XCircle className="text-destructive mt-0.5 size-4 shrink-0" />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        {!submitted ? (
          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="sm"
              disabled={!selectedId}
              onClick={() => setSubmitted(true)}
            >
              Check answer
            </Button>
            {block.hint ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowHint((v) => !v)}
              >
                {showHint ? "Hide hint" : "Show hint"}
              </Button>
            ) : null}
          </div>
        ) : (
          <p
            role="status"
            className={cn(
              "rounded-md p-3 text-sm",
              isCorrect
                ? "bg-emerald-500/10 text-emerald-900 dark:text-emerald-200"
                : "bg-secondary text-secondary-foreground",
            )}
          >
            <span className="font-medium">{isCorrect ? "Correct. " : "Not quite. "}</span>
            {block.explanation}
          </p>
        )}

        {showHint && !submitted && block.hint ? (
          <p className="text-muted-foreground text-sm italic">{block.hint}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
