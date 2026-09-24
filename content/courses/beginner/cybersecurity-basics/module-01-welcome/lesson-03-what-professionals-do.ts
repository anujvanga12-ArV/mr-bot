import type { Lesson } from "@/content/types";

export const whatProfessionalsDo: Lesson = {
  slug: "what-cybersecurity-professionals-do",
  title: "What Cybersecurity Professionals Do",
  estimatedMinutes: 9,
  objective:
    "Distinguish defensive and offensive cybersecurity roles, and see how the two work together.",
  blocks: [
    {
      type: "text",
      body: "Cybersecurity work generally splits into two mindsets that need each other. Defensive cybersecurity (often called \"blue team\") is about building and monitoring protections — setting up systems correctly, watching for suspicious activity, and responding when something goes wrong. Offensive cybersecurity (\"red team\") is about thinking like an attacker on purpose, with permission, to find weaknesses before someone with bad intentions does.",
    },
    {
      type: "vocabulary",
      term: {
        term: "Ethical hacking",
        simpleDefinition:
          "Testing a system's defenses with the owner's permission, to find and fix weaknesses before a real attacker does.",
        technicalDefinition:
          "Also called authorized penetration testing. The key word is authorized — the same techniques used without permission are illegal, regardless of intent. Ethical hackers operate under a signed agreement that defines exactly what they're allowed to test.",
      },
    },
    {
      type: "text",
      body: "A few of the roles you'd find on a cybersecurity team:\n\n• Security analyst — watches systems for suspicious activity and investigates alerts.\n• Incident responder — steps in when something has already gone wrong, to contain it and figure out what happened.\n• Penetration tester — gets hired to break into systems on purpose, with permission, to find weaknesses.\n• Security engineer — builds the tools and systems that keep everything protected in the first place.\n\nThese aren't the only paths, and people often move between them — but almost all of them started the way you're starting now, by learning what a threat actually looks like.",
    },
    {
      type: "scenario",
      setup:
        "A friend says: \"I want to get into cybersecurity so I can hack into my friend's game account as a prank.\" What's the most accurate thing to tell them?",
      choices: [
        {
          id: "harmless",
          text: "It's fine if it's just a friend and nobody gets hurt.",
          isSafe: false,
          feedback:
            "Accessing someone else's account without permission is unauthorized access, even between friends and even as a joke — many places this is against platform rules at minimum, and can be illegal depending on what's done. It's also exactly the opposite of what makes someone employable in the field.",
        },
        {
          id: "explain-authorization",
          text: "Real cybersecurity work — even the offensive side — requires explicit permission from the owner of the system.",
          isSafe: true,
          feedback:
            "That's the line that matters most in this entire field. The techniques used by a professional penetration tester and an attacker can look identical from the outside — authorization is what separates a career from a crime.",
        },
      ],
    },
    {
      type: "question",
      prompt: "What's the main difference between offensive and defensive cybersecurity?",
      options: [
        { id: "a", text: "Offensive roles are illegal and defensive roles are legal" },
        { id: "b", text: "Offensive roles find weaknesses with permission; defensive roles build and monitor protections" },
        { id: "c", text: "There's no real difference — they're the same job with different titles" },
        { id: "d", text: "Offensive roles only exist in movies" },
      ],
      correctOptionId: "b",
      explanation:
        "Both are legitimate, necessary careers. The distinction is the angle: offensive roles simulate an attacker (with authorization) to expose weaknesses; defensive roles build, monitor, and respond to protect against real attackers.",
    },
  ],
  quiz: {
    slug: "module-01-welcome-review",
    questions: [
      {
        type: "question",
        prompt: "Cybersecurity is best described as protecting...",
        options: [
          { id: "a", text: "Only banks and governments" },
          { id: "b", text: "Any device, account, or information that could be accessed without permission" },
          { id: "c", text: "Only information after it's already been stolen" },
        ],
        correctOptionId: "b",
        explanation: "It applies anywhere information exists, at any scale — from your phone to a hospital's records.",
      },
      {
        type: "question",
        prompt: "Your school upgrades its network security. Does that mean you no longer need a strong password?",
        options: [
          { id: "a", text: "Yes — the school's security covers everyone" },
          { id: "b", text: "No — personal and organizational security are both needed, and neither replaces the other" },
        ],
        correctOptionId: "b",
        explanation: "Strong organizational security reduces risk, but a weak personal password is still an open door on your side of things.",
      },
      {
        type: "question",
        prompt: "A security email asks you to click a link to 'verify your account immediately.' What's the safer habit?",
        options: [
          { id: "a", text: "Click the link since the email looks official" },
          { id: "b", text: "Go to the site directly yourself, without using the link" },
        ],
        correctOptionId: "b",
        explanation: "Typing the address yourself (or using a saved bookmark) means you can't be routed to a fake page — even if the original email turns out to be genuine.",
      },
      {
        type: "question",
        prompt: "What makes ethical hacking 'ethical' rather than illegal?",
        options: [
          { id: "a", text: "The hacker's good intentions" },
          { id: "b", text: "Explicit authorization from the system's owner" },
          { id: "c", text: "Not causing any actual damage" },
        ],
        correctOptionId: "b",
        explanation: "Intent and outcome don't change the legal line — authorization does. The same technique is a crime without it, regardless of motive.",
      },
    ],
  },
};
