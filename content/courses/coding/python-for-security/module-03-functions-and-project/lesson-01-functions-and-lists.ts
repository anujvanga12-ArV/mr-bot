import type { Lesson } from "@/content/types";

export const functionsAndLists: Lesson = {
  slug: "functions-and-lists",
  title: "Functions and Lists",
  estimatedMinutes: 10,
  objective: "Package logic into a reusable function, and use a list to hold multiple pieces of data you check with the same rule.",
  blocks: [
    {
      type: "text",
      body: "A function is a named, reusable block of code. Instead of copy-pasting the same check everywhere you need it, you write it once and call it by name.",
    },
    {
      type: "code",
      language: "python",
      code: 'def is_long_enough(password):\n    return len(password) >= 12\n\nprint(is_long_enough("short"))\nprint(is_long_enough("this-is-long-enough"))',
    },
    {
      type: "text",
      body: "`def` starts a function definition, the name in parentheses (`password`) is a parameter — a placeholder for whatever value gets passed in when the function is called — and `return` sends a value back to wherever the function was called from.",
    },
    {
      type: "code",
      language: "python",
      code: 'suspicious_domains = ["malicious.test", "phish-example.com", "fake-bank.net"]\n\ndef is_suspicious(domain):\n    return domain in suspicious_domains\n\nfor domain in ["example.com", "phish-example.com"]:\n    print(domain, "->", is_suspicious(domain))',
    },
    {
      type: "text",
      body: "That's a list (`suspicious_domains`) combined with a function (`is_suspicious`) combined with a loop — three things from the last two lessons working together, which is genuinely what most small security scripts look like: a list of things to check against, a function that defines the check, and a loop that applies it.",
    },
    {
      type: "question",
      prompt: 'Given the code above, what does is_suspicious("example.com") return?',
      options: [
        { id: "a", text: "True" },
        { id: "b", text: "False" },
        { id: "c", text: '"example.com"' },
      ],
      correctOptionId: "b",
      explanation: '"example.com" isn\'t in suspicious_domains, so the `in` check evaluates to False, and that\'s what gets returned.',
    },
    {
      type: "code",
      language: "python",
      code: '# A dictionary maps a key to a value — useful when you need to look\n# something up by name rather than by position in a list.\nfailed_logins = {"alice": 1, "bob": 5, "carol": 0}\n\nfor username, count in failed_logins.items():\n    if count >= 5:\n        print(username, "should be locked out")',
    },
    {
      type: "question",
      prompt: "Given the dictionary example above, whose account gets flagged?",
      options: [
        { id: "a", text: "alice" },
        { id: "b", text: "bob" },
        { id: "c", text: "carol" },
        { id: "d", text: "No one" },
      ],
      correctOptionId: "b",
      explanation: 'bob has 5 failed logins, which meets the >= 5 threshold — alice (1) and carol (0) don\'t.',
      hint: "Check each value against the threshold in the if statement.",
    },
  ],
};
