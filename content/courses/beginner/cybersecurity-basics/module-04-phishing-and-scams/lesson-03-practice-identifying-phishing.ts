import type { Lesson } from "@/content/types";

export const practiceIdentifyingPhishing: Lesson = {
  slug: "practice-identifying-phishing",
  title: "Practice: Identify the Phishing Attempt",
  estimatedMinutes: 8,
  objective: "Apply the phishing indicators from this module to new, unfamiliar examples.",
  blocks: [
    {
      type: "text",
      body: "You've seen the individual indicators — urgency, sender mismatch, suspicious links, unexpected requests. This lesson is just practice putting them together quickly, the way you'd need to in real life, where you won't get a lesson telling you \"this one's a phishing attempt.\"",
    },
    {
      type: "scenario",
      setup:
        'A message claiming to be from a delivery company says: "We attempted delivery but need you to confirm your address and pay a small $2.50 redelivery fee within 2 hours: [link]". You are expecting a package.',
      choices: [
        {
          id: "pay-it",
          text: "Pay the small fee — it's not much money, and you are expecting something.",
          isSafe: false,
          feedback:
            "The small dollar amount is deliberate — it's designed to feel too trivial to question. But the actual goal is usually your payment card details, not the $2.50 itself. The short deadline is the same urgency trick, dressed differently.",
        },
        {
          id: "check-directly",
          text: "Ignore the link and check your delivery status directly on the courier's official site or app.",
          isSafe: true,
          feedback:
            "Right — even though you are genuinely expecting a package, that doesn't make this specific message legitimate. Checking through the courier's real app or site sidesteps the fake link entirely.",
        },
      ],
    },
    {
      type: "scenario",
      setup:
        "An email from what looks like your school's IT department says: \"We're migrating email systems tonight. Log in now to keep your account active: [link].\" It's sent at 11pm.",
      choices: [
        {
          id: "log-in-now",
          text: "Log in through the link right away so your account doesn't get deactivated.",
          isSafe: false,
          feedback:
            "Late-night timing plus a hard deadline is a very deliberate combination — it's counting on you not wanting to double-check at 11pm. Real IT migrations are usually announced in advance through official channels, not sprung on you with an urgent late-night email.",
        },
        {
          id: "wait-and-verify",
          text: "Wait until you can check through an official school channel (not the email link) before doing anything.",
          isSafe: true,
          feedback:
            "Good instinct. If it's real, it'll still be real in the morning, and the school's own website or a call to IT will confirm it without relying on the email's link at all.",
        },
      ],
    },
    {
      type: "question",
      prompt:
        "A message uses a very small dollar amount to make a scam fee feel worth ignoring the risk. What's this an example of?",
      options: [
        { id: "a", text: "A legitimate business practice" },
        {
          id: "b",
          text: "Reducing the perceived stakes so you skip the caution you'd normally apply",
        },
      ],
      correctOptionId: "b",
      explanation:
        "Small amounts lower your guard the same way urgency does — both exist to shortcut the moment where you'd normally stop and check.",
    },
  ],
  quiz: {
    slug: "module-04-phishing-and-scams-review",
    questions: [
      {
        type: "question",
        prompt: "What combination of traits makes a message likely to be phishing?",
        options: [
          {
            id: "a",
            text: "An unexpected request, urgency, and a request to click a link or give credentials",
          },
          { id: "b", text: "Any message that mentions a deadline of any kind" },
        ],
        correctOptionId: "a",
        explanation:
          "It's the combination — not any single trait alone — that forms the recognizable pattern.",
      },
      {
        type: "question",
        prompt:
          "The safest way to check if an account issue mentioned in an email is real is to...",
        options: [
          { id: "a", text: "Click the link in the email to check" },
          { id: "b", text: "Go to the site directly yourself, without using the email's link" },
        ],
        correctOptionId: "b",
        explanation:
          "This sidesteps fake login pages entirely, regardless of how convincing the email looked.",
      },
      {
        type: "question",
        prompt:
          "A friend's account sends an oddly-worded, curiosity-baiting link. What's the safest response?",
        options: [
          { id: "a", text: "Click it since it's from someone you know" },
          {
            id: "b",
            text: "Verify with your friend through a separate channel before clicking anything",
          },
        ],
        correctOptionId: "b",
        explanation:
          "A compromised account isn't really controlled by your friend anymore — verifying separately confirms who's actually sending it.",
      },
      {
        type: "question",
        prompt:
          "Why do phishing messages often use a very small dollar amount or a very short deadline?",
        options: [
          {
            id: "a",
            text: "To lower your guard by making the request feel too trivial or too urgent to question",
          },
          { id: "b", text: "Because scammers legally can't ask for large amounts" },
        ],
        correctOptionId: "a",
        explanation:
          "Both tactics are designed to shortcut the moment of caution you'd normally apply.",
      },
    ],
  },
};
