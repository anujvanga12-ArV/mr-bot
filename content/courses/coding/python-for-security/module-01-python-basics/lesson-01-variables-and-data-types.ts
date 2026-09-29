import type { Lesson } from "@/content/types";

export const variablesAndDataTypes: Lesson = {
  slug: "variables-and-data-types",
  title: "Variables and Data Types",
  estimatedMinutes: 10,
  objective: "Write and read simple Python variables, and recognize the basic data types you'll use constantly in security scripting.",
  blocks: [
    {
      type: "text",
      body: "A variable is just a name that points to a value. Python doesn't make you declare a type up front — you just assign a value, and Python figures out what kind of thing it is.",
    },
    {
      type: "code",
      language: "python",
      code: 'username = "admin"        # a string (text)\nfailed_attempts = 3       # an integer (whole number)\nis_locked_out = False     # a boolean (True or False)\n\nprint(username, failed_attempts, is_locked_out)',
    },
    {
      type: "text",
      body: "Notice the three data types already in play: a string (text, in quotes), an integer (a whole number, no quotes), and a boolean (True or False — exactly what you'd reach for to represent something like \"is this account locked?\").",
    },
    {
      type: "question",
      prompt: "What will the following code print?\n\nlogin_attempts = 5\nmax_attempts = 3\nprint(login_attempts > max_attempts)",
      options: [
        { id: "a", text: "5" },
        { id: "b", text: "True" },
        { id: "c", text: "False" },
        { id: "d", text: "An error" },
      ],
      correctOptionId: "b",
      explanation: "5 > 3 is a comparison that evaluates to a boolean. Since 5 is indeed greater than 3, it prints True.",
      hint: "The > symbol compares two numbers and produces a boolean result, not a number.",
    },
    {
      type: "text",
      body: "One more thing worth internalizing early: variable names should describe what they hold. `login_attempts` tells you exactly what's being counted — a variable named `x` doesn't, and six months from now (or six minutes from now, reading someone else's code) that difference matters a lot.",
    },
  ],
};
