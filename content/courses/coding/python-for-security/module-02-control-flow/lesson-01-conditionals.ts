import type { Lesson } from "@/content/types";

export const conditionals: Lesson = {
  slug: "conditionals",
  title: "Conditionals",
  estimatedMinutes: 10,
  objective:
    "Use if/elif/else to make a script react differently to different input — the backbone of any check or validator.",
  blocks: [
    {
      type: "text",
      body: "Almost every security-related script boils down to: check something, then do different things depending on what you find. That's exactly what if/elif/else is for.",
    },
    {
      type: "code",
      language: "python",
      code: 'password_length = 6\n\nif password_length >= 12:\n    print("Strong length")\nelif password_length >= 8:\n    print("Acceptable length")\nelse:\n    print("Too short")',
    },
    {
      type: "text",
      body: "Python checks each condition top to bottom and runs the first one that's True, then skips the rest — `elif` only gets checked if the `if` above it was False. Indentation isn't just style here; it's how Python knows which lines belong to which branch.",
    },
    {
      type: "question",
      prompt:
        'What does this print?\n\nfailed_attempts = 3\n\nif failed_attempts >= 5:\n    print("Locked")\nelif failed_attempts >= 3:\n    print("Warning")\nelse:\n    print("OK")',
      options: [
        { id: "a", text: '"Locked"' },
        { id: "b", text: '"Warning"' },
        { id: "c", text: '"OK"' },
      ],
      correctOptionId: "b",
      explanation:
        'failed_attempts (3) isn\'t >= 5, so the first branch is skipped. It is >= 3, so "Warning" prints, and "OK" never runs since a match was already found.',
      hint: "Python checks conditions in order and stops at the first one that's True.",
    },
    {
      type: "scenario",
      setup:
        'You\'re writing a script to flag emails from unfamiliar senders. You write: if sender in trusted_list: print("Trusted") else: print("Flag for review"). A colleague suggests also handling the case where trusted_list itself failed to load. What\'s the concern?',
      choices: [
        {
          id: "no-need",
          text: "No need — if the list fails to load, the else branch will just flag everything, which is safe.",
          isSafe: false,
          feedback:
            'That happens to be true here, but only by accident — the real issue is that the code doesn\'t distinguish "the list loaded and sender isn\'t on it" from "something went wrong and there\'s no list to check against." Silently treating a broken data source the same as a real negative result is a common source of confusing bugs later.',
        },
        {
          id: "handle-explicitly",
          text: "Worth handling explicitly — check whether trusted_list loaded successfully before relying on it.",
          isSafe: true,
          feedback:
            "Right instinct. Security-relevant code especially should fail loudly and clearly when something upstream goes wrong, rather than quietly falling into a branch that happens to look safe.",
        },
      ],
    },
  ],
};
