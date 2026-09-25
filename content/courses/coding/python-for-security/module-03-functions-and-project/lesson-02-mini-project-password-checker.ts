import type { Lesson } from "@/content/types";

export const miniProjectPasswordChecker: Lesson = {
  slug: "mini-project-password-checker",
  title: "Mini Project: A Password Strength Checker",
  estimatedMinutes: 12,
  objective:
    "Combine variables, conditionals, loops, and functions into one small, real script — the same idea behind the platform's own Password Checker tool.",
  blocks: [
    {
      type: "text",
      body: "Everything so far — variables, conditionals, loops, functions — comes together in this one script. It won't be as thorough as the platform's own Password Checker tool (Tools → Password Checker), but it uses the exact same core idea: check a few specific things, and add up how many pass.",
    },
    {
      type: "code",
      language: "python",
      code: "def check_password_strength(password):\n    score = 0\n\n    if len(password) >= 12:\n        score += 1\n    if any(char.isupper() for char in password):\n        score += 1\n    if any(char.isdigit() for char in password):\n        score += 1\n\n    return score",
    },
    {
      type: "text",
      body: '`any(char.isupper() for char in password)` reads almost like English: "is there any character in the password that is uppercase?" It loops through every character and returns True the moment it finds one that qualifies — a compact way to write "does at least one exist" without writing out a full loop with a flag variable.',
    },
    {
      type: "question",
      prompt: 'What score does check_password_strength("short1") return, using the function above?',
      options: [
        { id: "a", text: "0" },
        { id: "b", text: "1" },
        { id: "c", text: "2" },
        { id: "d", text: "3" },
      ],
      correctOptionId: "b",
      explanation:
        '"short1" is under 12 characters (no point) and has no uppercase letter (no point), but it does contain a digit, "1" (one point). Total: 1.',
      hint: 'Check each of the three conditions against "short1" one at a time.',
    },
    {
      type: "code",
      language: "python",
      code: 'def check_password_strength(password):\n    score = 0\n    if len(password) >= 12:\n        score += 1\n    if any(char.isupper() for char in password):\n        score += 1\n    if any(char.isdigit() for char in password):\n        score += 1\n    return score\n\ntest_passwords = ["password", "Password1", "a-much-longer-Passphrase9"]\n\nfor pw in test_passwords:\n    score = check_password_strength(pw)\n    print(pw, "->", score, "/ 3")',
    },
    {
      type: "text",
      body: "Notice this script never prints or stores the passwords anywhere outside this one run — same principle as the web tool, just in a different form. If you wanted to extend this yourself: try adding a check for symbols, or a check against a short list of common passwords, the same way the module 3 lesson on password reuse described.",
    },
    {
      type: "question",
      prompt: 'Running the loop above, what score does "Password1" get?',
      options: [
        { id: "a", text: "1" },
        { id: "b", text: "2" },
        { id: "c", text: "3" },
      ],
      correctOptionId: "b",
      explanation:
        '"Password1" is under 12 characters (no point), has an uppercase "P" (one point), and has a digit "1" (one point). Total: 2.',
    },
  ],
  quiz: {
    slug: "coding-module-03-functions-and-project-review",
    questions: [
      {
        type: "question",
        prompt: "What does the `return` keyword do inside a function?",
        options: [
          { id: "a", text: "Sends a value back to wherever the function was called from" },
          { id: "b", text: "Prints a value to the screen" },
        ],
        correctOptionId: "a",
        explanation:
          "return hands a value back to the caller — it's how a function's result gets used elsewhere, and print is a separate, unrelated action.",
      },
      {
        type: "question",
        prompt: 'What does any(char.isdigit() for char in "abc123") return?',
        options: [
          { id: "a", text: "True" },
          { id: "b", text: "False" },
        ],
        correctOptionId: "a",
        explanation:
          '"abc123" contains digits (1, 2, 3), so at least one character satisfies isdigit(), making any(...) True.',
      },
      {
        type: "question",
        prompt:
          "In failed_logins.items(), what does .items() give you access to on each loop pass?",
        options: [
          { id: "a", text: "Both the key and the value together" },
          { id: "b", text: "Only the value" },
        ],
        correctOptionId: "a",
        explanation:
          ".items() yields key/value pairs, which is why the loop can unpack them into two variables at once (e.g. `for username, count in ...`).",
      },
      {
        type: "question",
        prompt:
          "Why does the mini-project script never print or store the test passwords outside its own run?",
        options: [
          {
            id: "a",
            text: "Same principle as the platform's Password Checker tool — nothing sensitive gets persisted anywhere",
          },
          { id: "b", text: "Python doesn't allow printing strings" },
        ],
        correctOptionId: "a",
        explanation:
          "It's a deliberate design choice carried over from the web tool, not a language limitation.",
      },
    ],
  },
};
