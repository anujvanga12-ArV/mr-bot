"use client";

import { cn } from "@/lib/utils";
import { EXPLANATION_LEVELS, type ExplanationLevel } from "@/lib/ai-tutor/system-prompt";

export function ExplanationLevelToggle({
  value,
  onChange,
}: {
  value: ExplanationLevel;
  onChange: (level: ExplanationLevel) => void;
}) {
  return (
    <div className="border-border flex w-fit gap-1 rounded-md border p-1">
      {EXPLANATION_LEVELS.map((level) => (
        <button
          key={level.value}
          type="button"
          onClick={() => onChange(level.value)}
          className={cn(
            "rounded px-3 py-1.5 text-xs font-medium transition-colors",
            value === level.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary",
          )}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
}
