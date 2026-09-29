import type { Lesson } from "@/content/types";

export const spottingFakeProfiles: Lesson = {
  slug: "spotting-fake-profiles",
  title: "Spotting Fake Profiles and Suspicious Messages",
  estimatedMinutes: 8,
  objective: "Recognize common indicators of a fake or compromised social media account.",
  blocks: [
    {
      type: "text",
      body: "Fake profiles serve different goals — running scams, spreading phishing links, or just impersonating someone for harassment — but they tend to share a similar set of tells, especially when you know what to check.",
    },
    {
      type: "text",
      body: "Common indicators worth checking, none of which are proof alone but which add up together: an account created very recently, very few posts or followers relative to who they claim to be, a profile photo that looks generic or professionally stocked rather than personal, and messages that arrive out of nowhere with an unusually strong pitch (romance, business opportunity, urgent help needed).",
    },
    {
      type: "scenario",
      setup:
        "Someone you don't know messages you claiming to be a talent scout for a modeling agency, complimenting your photos and asking you to move the conversation to a different app quickly.",
      choices: [
        {
          id: "engage",
          text: "Respond and consider it — it could be a real opportunity.",
          isSafe: false,
          feedback:
            "The push to move to a different platform quickly is a specific and common tactic — it gets you away from the original platform's reporting tools and often away from people who might warn you.",
        },
        {
          id: "be-skeptical",
          text: "Be skeptical of the unsolicited approach and the pressure to switch platforms, and verify independently if genuinely curious.",
          isSafe: true,
          feedback:
            "Right instinct. A real opportunity generally survives you taking your time and doing it through verifiable channels — a legitimate scout or company can be checked before you commit to anything.",
        },
      ],
    },
    {
      type: "scenario",
      setup:
        "Your friend's account, which you're already connected with, sends you a message that feels a little off in tone, with a link and the message \"you have to see this.\"",
      choices: [
        {
          id: "trust-because-friend",
          text: "Click it — you already know and trust this account.",
          isSafe: false,
          feedback:
            "The account being familiar doesn't guarantee the person controlling it right now is your friend — accounts get compromised, and \"you have to see this\" plus a link is a very common template for exactly that situation.",
        },
        {
          id: "verify-out-of-band",
          text: "Reach out to your friend a different way to check if it's really them before clicking anything.",
          isSafe: true,
          feedback:
            "Same pattern from Module 5: verify through a separate channel. If it turns out to be a compromised account, you've also just helped your friend find out sooner.",
        },
      ],
    },
    {
      type: "question",
      prompt: "Someone urges you to move a new conversation to a different app very quickly. What does this usually indicate?",
      options: [
        { id: "a", text: "Nothing notable — people prefer different apps for different reasons" },
        { id: "b", text: "A common tactic to move away from a platform's safety/reporting tools and outside observers" },
      ],
      correctOptionId: "b",
      explanation:
        "This specific pressure — especially paired with an unsolicited approach — shows up across several kinds of scams. It's also worth telling a parent, teacher, or another trusted adult about if it happens to you, rather than handling it alone.",
    },
  ],
};
