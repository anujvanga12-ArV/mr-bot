import type { Lesson } from "@/content/types";

export const sharedComputersAndPublicWifi: Lesson = {
  slug: "shared-computers-and-public-wifi",
  title: "Shared Computers and Public Wi-Fi",
  estimatedMinutes: 9,
  objective: "Apply safe habits when using a computer you don't own or a network you don't control.",
  blocks: [
    {
      type: "text",
      body: "Two situations deserve extra care: using a computer that isn't yours (school, library, a friend's house), and connecting to Wi-Fi you don't control (a coffee shop, an airport, a school's guest network).\n\nOn a shared computer, the risk is the next person who sits down. On public Wi-Fi, the risk is who else might be able to see your traffic on that same network.",
    },
    {
      type: "scenario",
      setup:
        "You check your email on a library computer, then get called away suddenly and leave without doing anything else. What's the risk, and what should you have done?",
      choices: [
        {
          id: "no-risk",
          text: "No real risk — the library computer resets itself eventually.",
          isSafe: false,
          feedback:
            "\"Eventually\" isn't the same as \"before the next person sits down.\" Many shared computers stay logged in until someone explicitly signs out or the session times out — which could be minutes away, not immediately.",
        },
        {
          id: "sign-out",
          text: "You should have signed out of your account and closed the browser before leaving.",
          isSafe: true,
          feedback:
            "Right. Signing out (not just closing the tab) ends the session, so the next person can't simply click 'back' into your inbox.",
        },
      ],
    },
    {
      type: "vocabulary",
      term: {
        term: "Public Wi-Fi",
        simpleDefinition:
          "A Wi-Fi network anyone nearby can join, often with no password or a shared one everyone knows.",
        technicalDefinition:
          "A network where the traditional trust assumptions of a private network don't hold — other devices on the same network segment may, depending on the network's configuration, be able to observe unencrypted traffic. HTTPS (covered in Module 7) protects the content of most modern browsing regardless of network trust, which is why it matters more on public Wi-Fi than almost anywhere else.",
      },
    },
    {
      type: "text",
      body: "The practical habits are simple: on a shared device, sign out completely and don't save passwords. On public Wi-Fi, avoid entering sensitive information on sites that don't show a lock icon or \"https\" in the address — you'll learn exactly what that means in Module 7. Neither of these means public Wi-Fi is unusable, just that it's not the moment to log into your bank for the first time on impulse.",
    },
    {
      type: "question",
      prompt: "On a computer you don't own, the single most important habit is to...",
      options: [
        { id: "a", text: "Use a shorter password so it's faster to type" },
        { id: "b", text: "Sign out of every account before you leave, rather than just closing the tab" },
        { id: "c", text: "Avoid using it at all, ever" },
      ],
      correctOptionId: "b",
      explanation:
        "Closing a tab often leaves your session active. Signing out ends it — that's the difference that actually matters on a device someone else will use next.",
    },
  ],
  quiz: {
    slug: "module-02-staying-safe-online-review",
    questions: [
      {
        type: "question",
        prompt: "Why is it more useful to think about combinations of personal details rather than one detail at a time?",
        options: [
          { id: "a", text: "Because a single detail is never risky" },
          { id: "b", text: "Because several 'harmless' details together can identify or locate someone" },
        ],
        correctOptionId: "b",
        explanation: "A school name, a schedule, and a gamertag each seem minor alone but combine into something identifying.",
      },
      {
        type: "question",
        prompt: "A website says you must download a viewer to continue. What's the safest response?",
        options: [
          { id: "a", text: "Download it since the site says it's required" },
          { id: "b", text: "Close the pop-up and, if you truly need that software, get it from its own official site later" },
        ],
        correctOptionId: "b",
        explanation: "Legitimate content rarely requires a surprise mid-visit install — the urgency is the manipulation, not a real requirement.",
      },
      {
        type: "question",
        prompt: "On a shared library or school computer, what should you do before walking away?",
        options: [
          { id: "a", text: "Just close the browser tab" },
          { id: "b", text: "Sign out of every account you used" },
        ],
        correctOptionId: "b",
        explanation: "Closing a tab often leaves the session active for the next person; signing out actually ends it.",
      },
      {
        type: "question",
        prompt: "What's the main extra risk on public Wi-Fi compared to a private home network?",
        options: [
          { id: "a", text: "Other people on the same network may be able to observe unencrypted traffic" },
          { id: "b", text: "Public Wi-Fi always deletes your files" },
        ],
        correctOptionId: "a",
        explanation: "It's about who else shares the network, not about the connection destroying data — HTTPS (Module 7) is what protects most of your actual browsing content.",
      },
    ],
  },
};
