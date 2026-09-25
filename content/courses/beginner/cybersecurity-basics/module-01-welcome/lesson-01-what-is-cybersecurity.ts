import type { Lesson } from "@/content/types";

export const whatIsCybersecurity: Lesson = {
  slug: "what-is-cybersecurity",
  title: "What Is Cybersecurity?",
  estimatedMinutes: 8,
  objective:
    "Explain what cybersecurity means and why it applies to your own devices and accounts.",
  blocks: [
    {
      type: "text",
      body: "Think about everything you did today that involved a screen: unlocking your phone, checking a message, maybe playing a game or turning in homework online. Every one of those moments involved information — your information — moving somewhere and being stored somewhere.\n\nCybersecurity is the practice of protecting that information, and the devices and accounts it lives on, from people who shouldn't be able to see it, change it, or use it.",
    },
    {
      type: "vocabulary",
      term: {
        term: "Cybersecurity",
        simpleDefinition:
          "Keeping your devices, accounts, and information safe from people who shouldn't be able to access them.",
        technicalDefinition:
          "The practice of protecting systems, networks, and data from unauthorized access, use, disclosure, disruption, modification, or destruction — commonly organized around the goals of confidentiality (only the right people can see it), integrity (it can't be changed without permission), and availability (it's there when you need it).",
      },
    },
    {
      type: "text",
      body: "Here's a comparison that makes it click for most people: locking your front door doesn't mean you think a break-in is guaranteed tonight. It means you've made it harder for that to happen, on a day when you're not around to stop it yourself.\n\nCybersecurity works the same way. A strong password, a locked phone, and knowing what a scam message looks like are all locks — for information instead of a house.",
    },
    {
      type: "scenario",
      setup:
        "You leave your phone on a table at lunch and step away for two minutes. Your phone doesn't require a passcode to unlock. What's the actual risk?",
      choices: [
        {
          id: "nothing-happens",
          text: "Probably nothing — most people wouldn't touch someone else's phone.",
          isSafe: false,
          feedback:
            "Most people wouldn't, and that's true. But security isn't about the average case — it's about removing the option for the one person who would. A lock costs you nothing when no one tries the door, and saves you a lot when someone does.",
        },
        {
          id: "lock-screen",
          text: "It's risky — without a lock screen, anyone nearby could open your messages, photos, or accounts.",
          isSafe: true,
          feedback:
            "Exactly. A locked phone doesn't just block strangers — it's the difference between someone glancing at your screen and someone reading your messages or logging into an account that's still signed in.",
        },
      ],
    },
    {
      type: "question",
      prompt: "Which of these best describes what cybersecurity protects?",
      options: [
        { id: "a", text: "Only large companies and governments" },
        { id: "b", text: "Only computers, not phones or tablets" },
        {
          id: "c",
          text: "Any device, account, or information that could be accessed without permission",
        },
        { id: "d", text: "Only information that's already been stolen once" },
      ],
      correctOptionId: "c",
      explanation:
        "Cybersecurity applies anywhere information exists — a school laptop, a gaming account, a family photo library, or a hospital's patient records. The scale is different, but the idea is the same: keep it accessible only to the people who should have access.",
      hint: "Think about the phone-on-the-table scenario — whose information was at risk there?",
    },
  ],
};
