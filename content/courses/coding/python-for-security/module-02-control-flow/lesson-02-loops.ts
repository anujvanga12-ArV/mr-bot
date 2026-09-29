import type { Lesson } from "@/content/types";

export const loops: Lesson = {
  slug: "loops",
  title: "Loops",
  estimatedMinutes: 10,
  objective: "Use a for loop to check every item in a list — one of the most common patterns in small security scripts.",
  blocks: [
    {
      type: "text",
      body: "A for loop runs the same block of code once for every item in a collection. This comes up constantly: checking every password in a list, every URL in a log file, every file in a folder.",
    },
    {
      type: "code",
      language: "python",
      code: 'suspicious_extensions = ["exe", "scr", "bat"]\nfilenames = ["invoice.pdf", "setup.exe", "notes.txt"]\n\nfor name in filenames:\n    extension = name.split(".")[-1]\n    if extension in suspicious_extensions:\n        print(name, "- flagged")\n    else:\n        print(name, "- ok")',
    },
    {
      type: "text",
      body: "`name.split(\".\")[-1]` splits the filename on every period and takes the last piece — the extension. This is genuinely the same idea behind the double-extension check in the platform's own File Analyzer tool, just written out in Python instead of TypeScript.",
    },
    {
      type: "question",
      prompt: 'Given the code above, what does the loop print for "setup.exe"?',
      options: [
        { id: "a", text: '"setup.exe - ok"' },
        { id: "b", text: '"setup.exe - flagged"' },
        { id: "c", text: "Nothing — .exe files are skipped entirely" },
      ],
      correctOptionId: "b",
      explanation: '"exe" is in suspicious_extensions, so the if condition is True and "flagged" prints.',
    },
    {
      type: "code",
      language: "python",
      code: '# while loops run as long as a condition stays True — useful when you\n# don\'t know in advance how many times you\'ll need to repeat\nattempts = 0\nmax_attempts = 3\n\nwhile attempts < max_attempts:\n    print("Attempt", attempts + 1)\n    attempts += 1\n\nprint("Locked out")',
    },
    {
      type: "question",
      prompt: "How many times will \"Attempt\" print in the while-loop example above?",
      options: [
        { id: "a", text: "2" },
        { id: "b", text: "3" },
        { id: "c", text: "4" },
        { id: "d", text: "Forever — this is an infinite loop" },
      ],
      correctOptionId: "b",
      explanation: "The loop runs while attempts < 3, for attempts = 0, 1, and 2 — three iterations — then stops once attempts becomes 3.",
      hint: "Trace through the value of `attempts` on each pass: it starts at 0 and increases by 1 every loop.",
    },
  ],
  quiz: {
    slug: "coding-module-02-control-flow-review",
    questions: [
      {
        type: "question",
        prompt: 'What prints?\n\nscore = 7\nif score > 8:\n    print("A")\nelif score > 5:\n    print("B")\nelse:\n    print("C")',
        options: [
          { id: "a", text: '"A"' },
          { id: "b", text: '"B"' },
          { id: "c", text: '"C"' },
        ],
        correctOptionId: "b",
        explanation: "7 isn't > 8, but it is > 5, so the elif branch runs.",
      },
      {
        type: "question",
        prompt: "In an if/elif/else chain, what happens once one branch's condition is found True?",
        options: [
          { id: "a", text: "Python runs that branch and skips the rest of the chain" },
          { id: "b", text: "Python runs that branch and also checks the remaining ones" },
        ],
        correctOptionId: "a",
        explanation: "Only the first matching branch runs — the rest of the chain is skipped entirely.",
      },
      {
        type: "question",
        prompt: "A for loop over a list of filenames runs its body...",
        options: [
          { id: "a", text: "Once, for the whole list at once" },
          { id: "b", text: "Once per item in the list" },
        ],
        correctOptionId: "b",
        explanation: "Each pass through a for loop handles exactly one item from the collection.",
      },
      {
        type: "question",
        prompt: "A while loop keeps running for as long as...",
        options: [
          { id: "a", text: "Its condition stays True" },
          { id: "b", text: "A fixed number of times, set when it's written" },
        ],
        correctOptionId: "a",
        explanation: "Unlike a for loop over a fixed list, a while loop's length depends entirely on when its condition becomes False.",
      },
    ],
  },
};
