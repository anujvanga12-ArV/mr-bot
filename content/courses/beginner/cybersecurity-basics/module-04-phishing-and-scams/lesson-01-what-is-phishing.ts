import type { Lesson } from "@/content/types";

export const whatIsPhishing: Lesson = {
  slug: "what-is-phishing",
  title: "What Is Phishing?",
  estimatedMinutes: 9,
  objective:
    "Define phishing and identify the core indicators that a message is trying to manipulate you.",
  blocks: [
    {
      type: "text",
      body: "Phishing is a message — an email, a text, a chat DM — designed to trick you into doing something you wouldn't do if you thought about it calmly: clicking a link, entering a password, or sending money or information. It works by combining a believable disguise with pressure to act fast.",
    },
    {
      type: "vocabulary",
      term: {
        term: "Phishing",
        simpleDefinition:
          "A fake message pretending to be from someone trustworthy, designed to trick you into clicking a link or giving up information.",
        technicalDefinition:
          "A social engineering technique that uses deceptive communications — often impersonating a trusted sender — to induce a target to reveal credentials, install malware, or take a harmful action. Effectiveness relies more on psychological pressure (urgency, authority, fear) than on technical sophistication.",
      },
    },
    {
      type: "text",
      body: 'Here\'s an example, entirely made up for this lesson:\n\n"Your student account requires verification. Click here to continue, or your access will be suspended within 24 hours."\n\nNotice what\'s doing the work here: it sounds official ("student account"), it creates urgency ("24 hours"), and it asks you to click rather than log in yourself. None of those three things alone proves it\'s fake — but together, they\'re the exact recipe.',
    },
    {
      type: "scenario",
      setup:
        'You get that exact email above. The sender\'s address is "support@your-schooI-portal.com" (look closely — is that an uppercase I or a lowercase l?). What should you do?',
      choices: [
        {
          id: "click-it",
          text: "Click the link to check if it's real — clicking a link can't hurt on its own.",
          isSafe: false,
          feedback:
            'Clicking often leads to a page that looks identical to the real login — designed purely to capture whatever you type into it. And that sender address is a classic trick: a capital "I" swapped in for a lowercase "l" to mimic the real domain at a glance.',
        },
        {
          id: "go-direct",
          text: "Ignore the link and log into your student account directly through the school's known website.",
          isSafe: true,
          feedback:
            "Exactly the right instinct. If there's a real issue with your account, you'll see it after logging in normally — and you've avoided giving anything to whoever sent that email.",
        },
      ],
    },
    {
      type: "text",
      body: "The indicators worth training yourself to notice, every time:\n\n• Unexpected request — you weren't already in the middle of this process.\n• Suspicious URL — misspelled, an unusual ending, or a sender address that's almost right.\n• Urgency — a deadline designed to stop you from thinking it through.\n• Request for credentials — real services essentially never ask you to \"confirm your password\" via a link in an email.\n• Sender mismatch — the display name says one thing, the actual address says another.",
    },
    {
      type: "question",
      prompt: "What makes phishing effective, more than anything technical?",
      options: [
        { id: "a", text: "Advanced hacking tools that break into your account directly" },
        {
          id: "b",
          text: "Psychological pressure — urgency, authority, and fear — combined with a believable disguise",
        },
        { id: "c", text: "Phishing only works on people who aren't careful with computers" },
      ],
      correctOptionId: "b",
      explanation:
        "Phishing rarely relies on breaking anything technically. It relies on getting you to act before you've had a moment to think — which is exactly why slowing down is the actual defense.",
    },
  ],
};
