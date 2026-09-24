import type { Lesson } from "@/content/types";

export const groupChatsAndCommunities: Lesson = {
  slug: "group-chats-and-communities",
  title: "Group Chats, Communities, and Fake Giveaways",
  estimatedMinutes: 9,
  objective: "Apply social engineering awareness to group and community settings, where trust spreads socially.",
  blocks: [
    {
      type: "text",
      body: "Group chats and online communities add a twist: trust doesn't just come from a single message, it comes from the group itself. If several people in a chat seem excited about something, it feels more credible — even if some of those \"people\" are fake accounts working together.",
    },
    {
      type: "scenario",
      setup:
        "In a community Discord server, several accounts (that you don't recognize) are hyping up a \"giveaway\": \"I just won a free gaming console! Just verify your account here first: [link]\" — with multiple messages like this in quick succession.",
      choices: [
        {
          id: "join-in",
          text: "Follow the link — multiple people seem to be winning, so it's probably legitimate.",
          isSafe: false,
          feedback:
            "Multiple accounts posting the same claim in quick succession is a common tactic precisely because it manufactures social proof — the appearance that \"everyone else\" already trusts it. It doesn't mean it's real.",
        },
        {
          id: "check-official-channel",
          text: "Check the server's official announcements channel or ask a real moderator before doing anything.",
          isSafe: true,
          feedback:
            "Good instinct. A real giveaway run by the community's actual organizers will be confirmed through official channels — not scattered hype messages from unfamiliar accounts.",
        },
      ],
    },
    {
      type: "scenario",
      setup:
        "A group chat member you've chatted with for a while suddenly asks to borrow your account \"just for a few minutes\" to help them with something in a game, promising to give it right back.",
      choices: [
        {
          id: "lend-it",
          text: "Lend it — you've talked to them before, so it should be fine.",
          isSafe: false,
          feedback:
            "Familiarity built up over time in a chat is exactly what makes this request feel safe — which is why it's used. Once someone has your login, \"a few minutes\" is entirely up to them, not you.",
        },
        {
          id: "decline",
          text: "Decline — no one needs your account credentials to \"help\" with something in a game.",
          isSafe: true,
          feedback:
            "Right. A reasonable request for help doesn't require your login. If it genuinely needs your account specifically, that's the moment to be more cautious, not less.",
        },
      ],
    },
    {
      type: "question",
      prompt: "Why can group chats and communities make social engineering more convincing, not less?",
      options: [
        { id: "a", text: "Because groups are always more careful than individuals" },
        { id: "b", text: "Because seeing multiple people seem to trust something creates social proof, even if some of those accounts are fake" },
      ],
      correctOptionId: "b",
      explanation:
        "Manufactured social proof — several accounts echoing the same claim — is a deliberate tactic, not a coincidence, especially in giveaway and hype scams.",
    },
  ],
  quiz: {
    slug: "module-05-social-engineering-review",
    questions: [
      {
        type: "question",
        prompt: "What makes social engineering different from a purely technical hacking attack?",
        options: [
          { id: "a", text: "It targets human psychology rather than software vulnerabilities" },
          { id: "b", text: "It only works over the phone" },
        ],
        correctOptionId: "a",
        explanation: "It manipulates people directly, which is why it can succeed even against technically secure systems.",
      },
      {
        type: "question",
        prompt: "Someone claiming to be a game moderator asks for your password to \"verify\" your account. What's true?",
        options: [
          { id: "a", text: "Real moderators essentially never need your actual password" },
          { id: "b", text: "It's fine if they sound official" },
        ],
        correctOptionId: "a",
        explanation: "This is one of the most reliable red flags across almost every social engineering scenario.",
      },
      {
        type: "question",
        prompt: "Multiple unfamiliar accounts in a chat all hype the same \"giveaway\" at once. What should that make you think?",
        options: [
          { id: "a", text: "It must be real since so many people are excited" },
          { id: "b", text: "This could be manufactured social proof — check an official channel instead" },
        ],
        correctOptionId: "b",
        explanation: "Coordinated hype from unfamiliar accounts is a known tactic for making a scam feel credible.",
      },
      {
        type: "question",
        prompt: "A chat acquaintance asks to briefly borrow your game account to \"help\" with something. What's the safest response?",
        options: [
          { id: "a", text: "Decline — no legitimate help requires handing over your login" },
          { id: "b", text: "Agree, since you've talked to them before" },
        ],
        correctOptionId: "a",
        explanation: "Built-up familiarity is exactly what this kind of request relies on — it doesn't make handing over credentials safe.",
      },
    ],
  },
};
