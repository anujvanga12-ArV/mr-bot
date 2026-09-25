import type { Lesson } from "@/content/types";

export const fakeMessagesAndFakePages: Lesson = {
  slug: "fake-messages-and-fake-pages",
  title: "Fake Messages, Fake Pages, and Fake Giveaways",
  estimatedMinutes: 9,
  objective: "Recognize phishing outside of email — in texts, chat, and fake promotions.",
  blocks: [
    {
      type: "text",
      body: 'Phishing isn\'t just an email problem. The same tricks show up as text messages ("smishing"), direct messages on social platforms and in games, and fake pages designed to look identical to a real login screen. The disguise changes; the pattern — urgency plus a request to click or share something — stays the same.',
    },
    {
      type: "vocabulary",
      term: {
        term: "Fake login page",
        simpleDefinition:
          "A page made to look exactly like a real sign-in screen, built only to steal whatever you type into it.",
        technicalDefinition:
          "Often reached via a phishing link using a domain designed to resemble the legitimate one (character substitution, extra subdomains, or a different top-level domain). The page mirrors the real site's design closely enough that a quick glance won't reveal the difference — checking the actual address bar is what does.",
      },
    },
    {
      type: "scenario",
      setup:
        "A text message arrives: \"You've won a $500 gift card! Claim it here before it expires: [link]\". You don't remember entering any contest.",
      choices: [
        {
          id: "claim-it",
          text: "Click the link — it doesn't hurt to check, and $500 is worth a look.",
          isSafe: false,
          feedback:
            "The excitement of a prize is exactly the emotional lever this is built around. Legitimate contests you didn't enter don't randomly text you winnings — and the link is the entire point of the message.",
        },
        {
          id: "ignore-delete",
          text: "Don't click it — delete or ignore the message.",
          isSafe: true,
          feedback:
            "Right. If you genuinely did enter a real contest recently, you can check its status by going directly to that contest's official site — never through a text link.",
        },
      ],
    },
    {
      type: "scenario",
      setup:
        "In a group chat, a friend's account sends: \"omg check this out, is this you in this video? [link]\" — but the message doesn't sound like how they usually talk.",
      choices: [
        {
          id: "click-curious",
          text: "Click it — you're curious, and it's from a friend's account.",
          isSafe: false,
          feedback:
            '"It\'s from a friend\'s account" is doing a lot of work here — if their account was compromised, the message isn\'t really from them anymore. Curiosity about being "in a video" is a classic hook for exactly this reason.',
        },
        {
          id: "verify-separately",
          text: "Message your friend a different way (not replying in that chat) to ask if they actually sent it.",
          isSafe: true,
          feedback:
            "Smart move. If their account is compromised, replying in the same chat might just alert whoever has control of it. Checking through a separate channel confirms whether it's really them.",
        },
      ],
    },
    {
      type: "question",
      prompt: "What's the most reliable way to tell if a login page is the real one?",
      options: [
        { id: "a", text: "If the page's design and logo look correct" },
        { id: "b", text: "Checking the actual web address in your browser's address bar" },
        { id: "c", text: "If the page loaded quickly" },
      ],
      correctOptionId: "b",
      explanation:
        "Design and logos are trivial to copy. The address bar shows the actual domain you're on, which a fake page can disguise but not fully hide from a careful look.",
    },
  ],
};
