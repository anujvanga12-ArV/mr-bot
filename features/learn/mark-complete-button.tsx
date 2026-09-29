"use client";

import { useState, useTransition } from "react";
import { Award, CheckCircle2, Sparkles } from "lucide-react";
import { completeLesson } from "@/features/learn/actions";
import { Button } from "@/components/ui/button";
import type { ProgressAwards } from "@/services/skill-service";

export function MarkCompleteButton({
  lessonSlug,
  initiallyCompleted,
}: {
  lessonSlug: string;
  initiallyCompleted: boolean;
}) {
  const [isCompleted, setIsCompleted] = useState(initiallyCompleted);
  const [awards, setAwards] = useState<ProgressAwards | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (isCompleted) {
    return (
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="size-4" />
          Lesson complete
        </p>
        {awards?.newSkills.map((skill) => (
          <p key={skill.slug} className="flex items-center gap-2 text-sm text-accent-foreground">
            <Sparkles className="size-4" />
            Skill unlocked: {skill.name}
          </p>
        ))}
        {awards?.newAchievements.map((achievement) => (
          <p key={achievement.slug} className="flex items-center gap-2 text-sm text-accent-foreground">
            <Award className="size-4" />
            Achievement unlocked: {achievement.name}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        disabled={isPending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            try {
              const result = await completeLesson(lessonSlug);
              setAwards(result);
              setIsCompleted(true);
            } catch {
              setError("Couldn't save your progress — check your connection and try again.");
            }
          });
        }}
      >
        {isPending ? "Saving…" : "Mark lesson complete"}
      </Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
