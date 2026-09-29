import type { Lesson } from "@/content/types";

export const whatMakesAPasswordStrong: Lesson = {
  slug: "what-makes-a-password-strong",
  title: "What Makes a Password Strong",
  estimatedMinutes: 9,
  objective: "Identify the specific traits that make a password hard to guess or crack.",
  blocks: [
    {
      type: "text",
      body: "A password's job is to prove an account belongs to you. It only does that job well if two things are true: it's hard for someone else to guess, and it isn't something you've used anywhere else. This lesson is about the first part.\n\nA quick note before we go further: never type a real password into this or any lesson, quiz, or example — including here. Everything below uses made-up examples only.",
    },
    {
      type: "vocabulary",
      term: {
        term: "Strong password",
        simpleDefinition:
          "A password that's long, unpredictable, and not based on personal information or common patterns.",
        technicalDefinition:
          "Password strength is primarily a function of entropy — how many attempts an attacker would need to guess it through brute force or pattern-based methods. Length contributes more to entropy than complexity rules alone; a long passphrase of unrelated words often resists guessing better than a short password with substituted symbols, because common substitutions (like \"@\" for \"a\") are already accounted for in modern cracking tools.",
      },
    },
    {
      type: "text",
      body: "Two ideas that surprise people: length matters more than most complexity rules people expect, and predictable patterns (like appending \"123!\" to a normal word) are counted on by anyone trying to guess passwords at scale. \"correcthorsebatterystaple\" — four unrelated words — is meaningfully harder to guess than \"P@ssw0rd1!\", even though the second one looks more \"complicated.\"",
    },
    {
      type: "scenario",
      setup:
        "You're choosing between two made-up example passwords for a new account: \"Tigers2024!\" and \"lamp-giraffe-thursday-window\". Which is the stronger choice, and why?",
      choices: [
        {
          id: "tigers",
          text: "\"Tigers2024!\" — it has a capital letter, numbers, and a symbol.",
          isSafe: false,
          feedback:
            "It technically satisfies a lot of password rules, but the pattern (word + year + symbol) is extremely common and exactly what guessing tools check first — especially if \"Tigers\" relates to something public about you, like a team name in your bio.",
        },
        {
          id: "lamp-giraffe",
          text: "\"lamp-giraffe-thursday-window\" — four unrelated words strung together.",
          isSafe: true,
          feedback:
            "Right. It's longer, the words don't relate to each other or to you personally, and there's no predictable pattern for a guessing tool to exploit — even without any symbols or capital letters.",
        },
      ],
    },
    {
      type: "question",
      prompt: "Why is \"lamp-giraffe-thursday-window\" a stronger example password than \"Tigers2024!\"?",
      options: [
        { id: "a", text: "Because it contains a special character" },
        { id: "b", text: "Because it's longer and doesn't follow a common, guessable pattern" },
        { id: "c", text: "Because it's easier to remember" },
      ],
      correctOptionId: "b",
      explanation:
        "Length and unpredictability matter more than satisfying a checklist of \"has a number, has a symbol.\" A common pattern with a symbol tacked on is still a common pattern.",
      hint: "Think about what a guessing tool checks for first: patterns, or raw length?",
    },
  ],
};
