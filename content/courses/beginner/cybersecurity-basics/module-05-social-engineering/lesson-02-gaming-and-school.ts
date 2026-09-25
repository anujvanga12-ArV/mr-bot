import type { Lesson } from "@/content/types";

export const socialEngineeringInGamingAndSchool: Lesson = {
  slug: "social-engineering-in-gaming-and-school",
  title: "Social Engineering in Gaming and School",
  estimatedMinutes: 8,
  objective: "Recognize social engineering tactics in contexts that feel low-stakes but aren't.",
  blocks: [
    {
      type: "text",
      body: "Social engineering doesn't only target adults or big companies — gaming platforms and school accounts are common targets precisely because they feel low-stakes, which makes people less cautious with them.",
    },
    {
      type: "scenario",
      setup:
        "In a game's chat, someone messages: \"I'm a moderator doing an account security check. Send me your login so I can verify you're not a bot, or your account will be suspended.\"",
      choices: [
        {
          id: "send-login",
          text: "Send it — they said they're a moderator, and losing your account would be worse.",
          isSafe: false,
          feedback:
            "This is a textbook authority-plus-fear combination. Real moderators and support staff essentially never need your actual password — legitimate verification happens through the platform's own systems, not by asking you to type your login into a chat.",
        },
        {
          id: "refuse-and-report",
          text: "Refuse, and report the message through the platform's official reporting tool.",
          isSafe: true,
          feedback:
            "Right response. No legitimate moderator needs your password to verify anything — that claim alone is the red flag, regardless of how official the message sounds.",
        },
      ],
    },
    {
      type: "scenario",
      setup:
        'An email appears to be from your school\'s IT help desk: "We noticed unusual login attempts on your account. Reply with your student ID and password to lock it down before further attempts succeed."',
      choices: [
        {
          id: "reply-with-info",
          text: "Reply quickly with the requested information to protect the account.",
          isSafe: false,
          feedback:
            "Ironically, this message is itself the attack — a real IT department can reset or lock an account from their own systems without ever needing your password sent to them directly.",
        },
        {
          id: "contact-it-directly",
          text: "Don't reply — contact the IT help desk directly through a known phone number or in person.",
          isSafe: true,
          feedback:
            "Exactly right. Verifying through a channel you already know and trust — not one provided by the suspicious message itself — is the pattern that works across every version of this scam.",
        },
      ],
    },
    {
      type: "text",
      body: 'Notice the shared thread in both scenarios: the message asks you to hand over a credential directly, and justifies it with authority ("I\'m a moderator," "we\'re IT") plus urgency ("before it\'s suspended," "before further attempts succeed"). No legitimate support process anywhere works by asking for your password in a chat message or email reply.',
    },
    {
      type: "question",
      prompt:
        'A message claiming to be tech support asks you to send your password to "verify" your account. What\'s true?',
      options: [
        { id: "a", text: "This is reasonable if the message sounds official enough" },
        {
          id: "b",
          text: "Legitimate support essentially never needs your actual password to verify or fix an account",
        },
      ],
      correctOptionId: "b",
      explanation:
        "This is one of the most reliable red flags in social engineering: a real request for account access, if there's a good reason for it, happens through the platform's own systems — not by asking you to hand it over directly.",
    },
  ],
};
