import type { Lesson } from "@/content/types";

export const personalInfoAndPrivacy: Lesson = {
  slug: "personal-information-and-privacy",
  title: "Personal Information and Privacy Online",
  estimatedMinutes: 8,
  objective: "Recognize what counts as personal information and why controlling who sees it matters.",
  blocks: [
    {
      type: "text",
      body: "Module 1 introduced personal information as details that identify you specifically. Online, that idea gets bigger: your name and birthday matter, but so do things that feel less obvious — your school's name, a photo with your street visible in the background, the games you play, even what time you're usually online.\n\nNone of these are dangerous on their own. The concern is what someone can build by combining several of them.",
    },
    {
      type: "vocabulary",
      term: {
        term: "Privacy setting",
        simpleDefinition:
          "A control that lets you choose who can see something you post or share — everyone, just friends, or no one.",
        technicalDefinition:
          "Access controls that determine the visibility scope of user-generated content or profile data, typically enforced at the application layer. Default settings vary by platform and often favor broader visibility unless changed.",
      },
    },
    {
      type: "text",
      body: "Here's the pattern worth remembering: one piece of information is usually harmless. A stranger knowing your first name isn't a problem. Knowing your first name, your school, and that you're home alone after 3pm every weekday is a very different situation — and each piece came from a different, individually 'harmless-looking' post.",
    },
    {
      type: "scenario",
      setup:
        "You just got a new gaming setup and want to post a photo of it. The photo shows your desk, a school ID badge on a lanyard in the background, and your gamertag is visible on screen. What's the safest move?",
      choices: [
        {
          id: "post-as-is",
          text: "Post it as is — it's just a photo of a desk.",
          isSafe: false,
          feedback:
            "By itself, maybe. But it links your gamertag to your school and your face (if it's on the badge) in one image — exactly the kind of combination that turns three harmless details into one identifying one.",
        },
        {
          id: "crop-or-blur",
          text: "Crop or blur out the ID badge before posting.",
          isSafe: true,
          feedback:
            "This is the habit worth building: not refusing to share things you're proud of, just checking what's in the frame first.",
        },
      ],
    },
    {
      type: "question",
      prompt: "Why is it more useful to think about combinations of information rather than single details?",
      options: [
        { id: "a", text: "Because a single detail is never risky under any circumstances" },
        { id: "b", text: "Because combining several details can identify or locate someone even when each detail alone seems harmless" },
        { id: "c", text: "Because privacy settings don't actually do anything" },
      ],
      correctOptionId: "b",
      explanation:
        "Individually 'safe' details — a school name, a schedule, a gamertag — can add up. Reviewing a post as a whole, not detail-by-detail, catches this.",
    },
  ],
};
