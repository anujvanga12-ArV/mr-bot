import type { Lesson } from "@/content/types";

export const theBeginnerChallenge: Lesson = {
  slug: "the-beginner-challenge",
  title: "The Beginner Challenge",
  estimatedMinutes: 15,
  objective:
    "Apply everything from Cybersecurity Basics — phishing, passwords, social engineering, malware, devices, and privacy — to fresh scenarios.",
  blocks: [
    {
      type: "text",
      body: "This is the last stop in Cybersecurity Basics. No new concepts here — just fresh scenarios pulling together everything from the last eight modules, the way real situations actually mix these ideas together rather than labeling themselves by topic.",
    },
    {
      type: "scenario",
      setup:
        "An email arrives claiming to be from a streaming service you use: \"Your payment failed. Update your billing details within 24 hours to avoid service interruption: [link].\" You do use this service.",
      choices: [
        {
          id: "click-update",
          text: "Click the link and update your billing info right away.",
          isSafe: false,
          feedback:
            "Urgency, a deadline, and a request to act through a link — even though you genuinely use this service, that doesn't make this specific message legitimate. Checking your account directly, without the email's link, settles it either way.",
        },
        {
          id: "check-account-directly",
          text: "Log into the streaming service directly (not through the email) to check your billing status.",
          isSafe: true,
          feedback:
            "Right. If there's a genuine billing issue, it'll show up when you log in normally — and you've avoided handing anything to whoever actually sent that email.",
        },
      ],
    },
    {
      type: "scenario",
      setup:
        "You're creating a new account and asked to set a password. You're considering \"Summer2024\" versus \"purple-kettle-orbit-nine\". Which should you choose, and would either benefit from something extra?",
      choices: [
        {
          id: "summer-password",
          text: "\"Summer2024\" — it's easy to remember and has both letters and numbers.",
          isSafe: false,
          feedback:
            "This follows an extremely common, guessable pattern (season + year). Length and unpredictability matter more than mixing letters and numbers in a predictable way.",
        },
        {
          id: "kettle-plus-mfa",
          text: "\"purple-kettle-orbit-nine\" — and turn on multi-factor authentication if it's offered.",
          isSafe: true,
          feedback:
            "Both parts matter: the passphrase is longer and unpredictable, and MFA means even a leaked password isn't enough on its own to get in.",
        },
      ],
    },
    {
      type: "scenario",
      setup:
        "A message in a gaming community, from an account styled like a staff member, says: \"We're verifying active players for a reward program. Reply with your login to confirm eligibility before the program closes tonight.\"",
      choices: [
        {
          id: "reply-with-login",
          text: "Reply with the login — it sounds official, and rewards are appealing.",
          isSafe: false,
          feedback:
            "Authority, urgency, and a reward — three separate levers, all pointing the same direction. No legitimate reward program needs your login credentials to verify eligibility.",
        },
        {
          id: "report-and-ignore",
          text: "Don't reply, and report the account through the platform's official tools.",
          isSafe: true,
          feedback:
            "Exactly right, and reporting it helps protect others who might see the same message.",
        },
      ],
    },
    {
      type: "scenario",
      setup:
        "You download a free tool from a site you found through a search engine, and shortly after, your device becomes noticeably slower and a program you don't recognize appears in your task list.",
      choices: [
        {
          id: "assume-coincidence",
          text: "Assume it's a coincidence unrelated to the download.",
          isSafe: false,
          feedback:
            "The timing here is a real signal, not something to dismiss. An unfamiliar program appearing right after installing something from an unverified source is worth investigating, not assuming away.",
        },
        {
          id: "scan-and-check",
          text: "Run an antivirus scan and look into what the unfamiliar program actually is.",
          isSafe: true,
          feedback:
            "Right approach — treating the combination of \"new download\" plus \"new unfamiliar program\" plus \"slowdown\" as worth checking, using the tools built for exactly this.",
        },
      ],
    },
    {
      type: "scenario",
      setup:
        "You're at an airport with a long layover and want to check your bank balance. You see two Wi-Fi networks: one named after the airport with no password, and your phone's own personal hotspot.",
      choices: [
        {
          id: "airport-wifi",
          text: "Use the open airport Wi-Fi — it's convenient and free.",
          isSafe: false,
          feedback:
            "An open network with no password is one you don't control and can't verify — exactly the situation where HTTPS matters, but where using your own hotspot avoids the question entirely for something as sensitive as banking.",
        },
        {
          id: "use-hotspot",
          text: "Use your phone's personal hotspot instead for anything sensitive like banking.",
          isSafe: true,
          feedback:
            "Good call. Your own hotspot is a network you control, which removes the \"who else is on this network\" concern entirely for sensitive activity.",
        },
      ],
    },
    {
      type: "scenario",
      setup:
        "You're about to post a celebratory photo from a trip: exact location tagged, captioned \"First week of two away from home, having a blast!\", visible to the public.",
      choices: [
        {
          id: "post-public",
          text: "Post it exactly as planned.",
          isSafe: false,
          feedback:
            "This combines a precise location with a clear statement that your home is empty for a specific, extended window — publicly. Each piece feels minor alone; together, it's a specific and avoidable disclosure.",
        },
        {
          id: "adjust-privacy",
          text: "Remove the exact location and the \"away from home\" detail, or limit the post's audience to close friends.",
          isSafe: true,
          feedback:
            "Right instinct — you can still share the moment without broadcasting exactly where you aren't right now, to everyone.",
        },
      ],
    },
    {
      type: "text",
      body: "That's every scenario type from the course, in the mixed-up way real situations actually present themselves. Finish the review below, and you've completed Cybersecurity Basics.\n\nFrom here, Foundations is the natural next step: it goes underneath a lot of terms you've already met in passing here — networking, authentication, encryption — and builds them into a real technical base for everything after.",
    },
  ],
  quiz: {
    slug: "module-09-beginner-challenge-final",
    questions: [
      {
        type: "question",
        prompt: "Cybersecurity is best described as protecting...",
        options: [
          { id: "a", text: "Only banks and governments" },
          { id: "b", text: "Any device, account, or information that could be accessed without permission" },
        ],
        correctOptionId: "b",
        explanation: "It applies at any scale, from a personal phone to an organization's servers.",
      },
      {
        type: "question",
        prompt: "Why is it risky to post several individually 'harmless' personal details together?",
        options: [
          { id: "a", text: "Combined, they can identify or locate someone even though each detail alone seemed fine" },
          { id: "b", text: "It isn't actually risky, since each detail is harmless" },
        ],
        correctOptionId: "a",
        explanation: "Combinations are the real risk — not any single detail in isolation.",
      },
      {
        type: "question",
        prompt: "What matters most for password strength?",
        options: [
          { id: "a", text: "Length and unpredictability, more than following a symbol/number checklist" },
          { id: "b", text: "Having at least one capital letter and one number, regardless of pattern" },
        ],
        correctOptionId: "a",
        explanation: "Common patterns with a symbol tacked on are still guessable — length and lack of pattern matter more.",
      },
      {
        type: "question",
        prompt: "The most reliable way to check a suspicious 'account issue' email is to...",
        options: [
          { id: "a", text: "Click the email's link to check directly" },
          { id: "b", text: "Go to the site yourself, without using the email's link" },
        ],
        correctOptionId: "b",
        explanation: "This sidesteps a potential fake login page entirely, regardless of how convincing the email looks.",
      },
      {
        type: "question",
        prompt: "Someone claiming to be staff or support asks for your password to 'verify' your account. What's true?",
        options: [
          { id: "a", text: "Legitimate staff essentially never need your actual password to verify anything" },
          { id: "b", text: "It's reasonable if they sound official enough" },
        ],
        correctOptionId: "a",
        explanation: "This is one of the most reliable red flags across phishing and social engineering alike.",
      },
      {
        type: "question",
        prompt: "Malware that locks your files and demands payment to unlock them is called...",
        options: [
          { id: "a", text: "Ransomware" },
          { id: "b", text: "Spyware" },
        ],
        correctOptionId: "a",
        explanation: "The lock-and-demand pattern specifically defines ransomware.",
      },
      {
        type: "question",
        prompt: "Why does HTTPS matter more on public Wi-Fi specifically?",
        options: [
          { id: "a", text: "Other devices may share that network, and HTTPS keeps your data unreadable to them" },
          { id: "b", text: "Public Wi-Fi doesn't function without it" },
        ],
        correctOptionId: "a",
        explanation: "The encryption matters everywhere, but the shared, unverified network is what makes it especially relevant on public Wi-Fi.",
      },
      {
        type: "question",
        prompt: "Why isn't deleting a post the same as fully erasing it everywhere?",
        options: [
          { id: "a", text: "Copies (screenshots, shares) may already exist beyond the platform's control" },
          { id: "b", text: "Deletion is always complete and permanent, everywhere it was ever seen" },
        ],
        correctOptionId: "a",
        explanation: "Deletion controls what the platform shows going forward — not copies that already left your control.",
      },
    ],
  },
};
