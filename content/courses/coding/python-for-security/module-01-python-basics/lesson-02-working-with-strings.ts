import type { Lesson } from "@/content/types";

export const workingWithStrings: Lesson = {
  slug: "working-with-strings",
  title: "Working with Strings",
  estimatedMinutes: 10,
  objective: "Use basic string methods that come up constantly in security-related scripts.",
  blocks: [
    {
      type: "text",
      body: "Strings show up everywhere in security scripting: usernames, URLs, log lines, file names. A handful of string methods handle most of what you'll need.",
    },
    {
      type: "code",
      language: "python",
      code: 'url = "HTTPS://Example.COM/Login"\n\nprint(url.lower())          # makes comparisons case-insensitive\nprint(url.startswith("https"))  # note: this is False here — case matters until you .lower() first\nprint(len(url))             # length of the string',
    },
    {
      type: "text",
      body: "That second line is a deliberate, realistic trap: `.startswith(\"https\")` checks for an exact, case-sensitive match, and the URL starts with \"HTTPS\" in capitals. This is exactly the kind of small bug that causes a real security check to silently do nothing — which is why comparing after `.lower()` is a common defensive habit, not just a style preference.",
    },
    {
      type: "code",
      language: "python",
      code: '# The fix: normalize before comparing\nurl = "HTTPS://Example.COM/Login"\nis_secure = url.lower().startswith("https")\nprint(is_secure)  # True',
    },
    {
      type: "question",
      prompt: 'What will this print?\n\nemail = "  User@Example.com  "\nprint(email.strip().lower())',
      options: [
        { id: "a", text: '"  User@Example.com  "' },
        { id: "b", text: '"user@example.com"' },
        { id: "c", text: "An error, because you can't chain two methods together" },
      ],
      correctOptionId: "b",
      explanation: '.strip() removes leading/trailing whitespace, and .lower() converts to lowercase. Chaining them runs .strip() first, then .lower() on the result — a very common pattern for cleaning up user input before comparing or storing it.',
      hint: "Methods can be chained left to right — each one runs on the result of the one before it.",
    },
  ],
  quiz: {
    slug: "coding-module-01-python-basics-review",
    questions: [
      {
        type: "question",
        prompt: 'What does this print?\n\nattempts = 4\nprint(attempts >= 3)',
        options: [
          { id: "a", text: "4" },
          { id: "b", text: "True" },
          { id: "c", text: "False" },
        ],
        correctOptionId: "b",
        explanation: "4 >= 3 is a comparison, and it evaluates to the boolean True.",
      },
      {
        type: "question",
        prompt: "Which data type would you use to represent \"is this account currently locked?\"",
        options: [
          { id: "a", text: "A string" },
          { id: "b", text: "A boolean" },
          { id: "c", text: "An integer" },
        ],
        correctOptionId: "b",
        explanation: "A yes/no state like this maps directly onto True/False — a boolean.",
      },
      {
        type: "question",
        prompt: 'Why might url.startswith("https") unexpectedly return False even for a legitimate HTTPS link?',
        options: [
          { id: "a", text: "startswith() is case-sensitive, so \"HTTPS\" in capitals won't match \"https\"" },
          { id: "b", text: "startswith() only works on numbers" },
        ],
        correctOptionId: "a",
        explanation: "Without normalizing case first (e.g. with .lower()), an exact-case check can silently fail on perfectly valid input.",
      },
      {
        type: "question",
        prompt: 'What does "  User@Example.com  ".strip().lower() produce?',
        options: [
          { id: "a", text: '"user@example.com"' },
          { id: "b", text: '"  user@example.com  "' },
        ],
        correctOptionId: "a",
        explanation: ".strip() removes the surrounding whitespace, then .lower() lowercases what's left.",
      },
    ],
  },
};
