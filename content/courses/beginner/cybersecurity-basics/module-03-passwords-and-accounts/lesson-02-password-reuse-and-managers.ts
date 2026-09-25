import type { Lesson } from "@/content/types";

export const passwordReuseAndManagers: Lesson = {
  slug: "password-reuse-and-managers",
  title: "Password Reuse and Password Managers",
  estimatedMinutes: 8,
  objective:
    "Explain why reusing passwords is risky and how a password manager solves the problem.",
  blocks: [
    {
      type: "text",
      body: "Here's a scenario that catches a lot of people off guard: you use the same password on a gaming site and your email. The gaming site gets breached — not because of anything you did — and your password leaks. Now anyone with that leaked password can try it on your email too. One weak link in a site you don't even control just put your email at risk.",
    },
    {
      type: "vocabulary",
      term: {
        term: "Credential stuffing",
        simpleDefinition:
          "When someone takes a leaked username/password from one breached site and tries it on other sites, hoping you reused it.",
        technicalDefinition:
          "An automated attack technique where attackers use lists of breached credentials (username/password pairs) and attempt to log into other, unrelated services at scale, relying on the statistical likelihood of password reuse across accounts. It's effective precisely because it doesn't require guessing — it uses passwords that are already known to be real.",
      },
    },
    {
      type: "text",
      body: "The fix is straightforward in concept and hard in practice: use a different password for every account. Hard in practice, because remembering dozens of long, unique passwords isn't realistic for most people. That's exactly the problem a password manager solves — it generates and remembers a unique strong password for every site, and you only need to remember one master password to unlock it.",
    },
    {
      type: "scenario",
      setup:
        "A friend says: \"I use the same strong password everywhere so I don't forget it. It's really long and has symbols, so it should be fine, right?\"",
      choices: [
        {
          id: "fine",
          text: "It's fine — a strong password is a strong password no matter where it's used.",
          isSafe: false,
          feedback:
            "Strength protects against guessing, but reuse creates a different problem entirely: if any one site is breached, that same password now works everywhere else it was used, no guessing required.",
        },
        {
          id: "not-fine",
          text: "It's still risky — reuse means one breach anywhere exposes every account using that password.",
          isSafe: true,
          feedback:
            "Exactly. Strength and uniqueness solve two different problems, and you need both. A password manager is the practical way to get uniqueness without needing to memorize dozens of passwords.",
        },
      ],
    },
    {
      type: "question",
      prompt: "Why doesn't a strong password protect you if it's reused across multiple sites?",
      options: [
        { id: "a", text: "Strong passwords always eventually get guessed anyway" },
        {
          id: "b",
          text: "If one site is breached, the leaked password can be tried directly on your other accounts",
        },
        { id: "c", text: "Password managers are actually less safe" },
      ],
      correctOptionId: "b",
      explanation:
        "Reuse turns one breach into many. Strength stops guessing attacks; uniqueness stops reuse attacks — they're separate protections.",
    },
  ],
};
