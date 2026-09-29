"use client";

import { Button } from "@/components/ui/button";

const QUICK_ACTIONS = [
  {
    label: "Give me an example",
    prompt: "Can you give me a concrete, real-world example of what we're discussing?",
  },
  {
    label: "Quiz me",
    prompt: "Quiz me with a couple of questions on what we've covered so far in this conversation.",
  },
  {
    label: "Give me a scenario",
    prompt: "Give me a realistic scenario to work through related to what we're discussing.",
  },
];

export function QuickActions({
  disabled,
  onSelect,
}: {
  disabled: boolean;
  onSelect: (prompt: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {QUICK_ACTIONS.map((action) => (
        <Button
          key={action.label}
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => onSelect(action.prompt)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
