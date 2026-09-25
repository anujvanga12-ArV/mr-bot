import type { Lesson } from "@/content/types";

export const mfaAndAccountRecovery: Lesson = {
  slug: "mfa-and-account-recovery",
  title: "Multi-Factor Authentication and Account Recovery",
  estimatedMinutes: 9,
  objective: "Explain what MFA adds beyond a password, and why recovery options need care too.",
  blocks: [
    {
      type: "text",
      body: "A password is one way of proving an account belongs to you. Multi-factor authentication (MFA) adds a second check, so knowing the password alone isn't enough — even if it leaked in a breach somewhere else.",
    },
    {
      type: "vocabulary",
      term: {
        term: "Multi-factor authentication (MFA)",
        simpleDefinition:
          "Proving it's really you with two different things — usually your password, plus a code or approval on your phone.",
        technicalDefinition:
          'Authentication using two or more independent factors, typically categorized as something you know (a password), something you have (a phone or security key), or something you are (a fingerprint). Requiring factors from different categories means a single leaked credential (a "something you know") isn\'t enough on its own to grant access.',
      },
    },
    {
      type: "text",
      body: "MFA isn't about distrust — it's about making a leaked password, by itself, useless to whoever has it. Even in the credential-stuffing scenario from the last lesson, an attacker with your correct password still can't get in without also having your phone or security key.",
    },
    {
      type: "scenario",
      setup:
        "An account you use offers to turn on MFA using text-message codes to your phone. It's a bit of extra effort to type a code each time you log in on a new device. Should you turn it on?",
      choices: [
        {
          id: "skip-it",
          text: "Skip it — typing an extra code each time is annoying.",
          isSafe: false,
          feedback:
            "The inconvenience is real but small — usually only on new devices, not every login. What it buys you is protection against exactly the breach-and-reuse scenario from the last lesson.",
        },
        {
          id: "turn-it-on",
          text: "Turn it on — the extra step is worth what it protects against.",
          isSafe: true,
          feedback:
            "Right call. It's also worth knowing that an authenticator app or a physical security key is generally considered stronger than text-message codes, since phone numbers can sometimes be hijacked separately — but text-message MFA is still far better than no MFA at all.",
        },
      ],
    },
    {
      type: "text",
      body: 'Account recovery deserves the same care. Security questions like "what\'s your pet\'s name" or "what city were you born in" are often answerable from information you\'ve posted publicly — which quietly undoes a strong password. Where possible, prefer recovery methods tied to something only you control, like a personal email or an authenticator app, over questions with guessable or publicly discoverable answers.',
    },
    {
      type: "question",
      prompt: "What does MFA protect against that a strong, unique password alone doesn't?",
      options: [
        { id: "a", text: "Nothing — a strong password is already enough" },
        {
          id: "b",
          text: "Someone who has obtained your correct password still can't log in without the second factor",
        },
        { id: "c", text: "It only protects against guessing attacks, same as password strength" },
      ],
      correctOptionId: "b",
      explanation:
        "MFA's whole value is in the scenario where the password itself is already compromised — through a breach, a leak, or being written down somewhere it shouldn't be.",
    },
  ],
  quiz: {
    slug: "module-03-passwords-and-accounts-review",
    questions: [
      {
        type: "question",
        prompt:
          "Which matters more for password strength: satisfying a symbol/number checklist, or length and unpredictability?",
        options: [
          { id: "a", text: "The checklist — symbols and numbers are what matter most" },
          {
            id: "b",
            text: "Length and unpredictability — common patterns are guessed first regardless of symbols",
          },
        ],
        correctOptionId: "b",
        explanation:
          "A long, unpredictable passphrase generally resists guessing better than a short password following a common symbol-substitution pattern.",
      },
      {
        type: "question",
        prompt: "Why is reusing even a strong password across sites risky?",
        options: [
          {
            id: "a",
            text: "A breach on one site exposes a password that then works on your other accounts",
          },
          { id: "b", text: "It isn't risky as long as the password itself is strong" },
        ],
        correctOptionId: "a",
        explanation:
          "Reuse turns a single breach anywhere into access everywhere that password was used — this is credential stuffing.",
      },
      {
        type: "question",
        prompt: "What problem does a password manager solve?",
        options: [
          { id: "a", text: "It lets you safely reuse one memorable password everywhere" },
          {
            id: "b",
            text: "It generates and remembers a unique strong password per site, without you memorizing each one",
          },
        ],
        correctOptionId: "b",
        explanation:
          "Password managers make uniqueness practical, which solves the reuse problem directly.",
      },
      {
        type: "question",
        prompt: "MFA protects your account even if...",
        options: [
          { id: "a", text: "Your password has been leaked or guessed" },
          { id: "b", text: "You forget your password entirely" },
        ],
        correctOptionId: "a",
        explanation:
          "MFA's core value is that a compromised password alone still isn't enough to log in.",
      },
    ],
  },
};
