"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import type { ScenarioBlock } from "@/content/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ScenarioBlockView({ block }: { block: ScenarioBlock }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = block.choices.find((choice) => choice.id === selectedId) ?? null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Scenario</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm">{block.setup}</p>

        <div className="flex flex-col gap-2">
          {block.choices.map((choice) => {
            const isSelected = choice.id === selectedId;
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => setSelectedId(choice.id)}
                className={cn(
                  "rounded-md border px-4 py-3 text-left text-sm transition-colors",
                  isSelected
                    ? choice.isSafe
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-destructive/50 bg-destructive/10"
                    : "border-input hover:bg-secondary",
                )}
              >
                <span className="flex items-start justify-between gap-3">
                  {choice.text}
                  {isSelected ? (
                    choice.isSafe ? (
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    ) : (
                      <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                    )
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        {selected ? (
          <p
            role="status"
            className={cn(
              "rounded-md p-3 text-sm",
              selected.isSafe
                ? "bg-emerald-500/10 text-emerald-900 dark:text-emerald-200"
                : "bg-destructive/10 text-destructive",
            )}
          >
            {selected.feedback}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
