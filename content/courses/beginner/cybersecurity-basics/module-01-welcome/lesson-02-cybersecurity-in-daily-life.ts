import type { Lesson } from "@/content/types";

export const cybersecurityInDailyLife: Lesson = {
  slug: "cybersecurity-in-daily-life",
  title: "Cybersecurity in Your Everyday Life",
  estimatedMinutes: 8,
  objective:
    "Identify the accounts, devices, and information in your own life that cybersecurity actually protects.",
  blocks: [
    {
      type: "text",
      body: "It's easy to picture cybersecurity as something that only matters to banks or big companies. But most of what it protects is far more personal: your school account, your gaming profile, the group chat you're in, the photos on your phone, and the Wi-Fi your family uses at home.",
    },
    {
      type: "text",
      body: "It also helps to know the difference between two related ideas. Personal security is about protecting your own accounts and devices — your password, your phone's lock screen, what you download. Organizational security is what a school, company, or gaming platform does on a much larger scale to protect everyone's data at once, like keeping their servers locked down and monitored.\n\nYou mostly control the first one. You benefit from the second one, but you're trusting someone else to do it well.",
    },
    {
      type: "vocabulary",
      term: {
        term: "Personal information",
        simpleDefinition:
          "Details that identify you specifically — your name, address, birthday, school, or passwords.",
        technicalDefinition:
          "Often called PII (personally identifiable information): any data that can be used on its own, or combined with other data, to identify a specific individual. Organizations that store PII typically have legal obligations to protect it.",
      },
    },
    {
      type: "scenario",
      setup:
        "A gaming platform you use sends an email saying there was 'unusual activity' on accounts in your region, and recommends everyone change their password. You didn't notice anything wrong with your own account. What should you do?",
      choices: [
        {
          id: "ignore",
          text: "Ignore it — nothing seems wrong with my account.",
          isSafe: false,
          feedback:
            "A breach on the company's side can expose your password even if your account itself hasn't been misused yet. 'Nothing looks wrong so far' isn't the same as 'nothing happened.'",
        },
        {
          id: "change-official",
          text: "Go to the platform's official site directly (not a link in the email) and change the password there.",
          isSafe: true,
          feedback:
            "Right approach. This protects you whether the warning is real or not, and going to the site yourself — rather than clicking a link in the email — means you can't be sent to a fake page pretending to be the real one.",
        },
        {
          id: "click-link",
          text: "Click the link in the email and change the password on the page it opens.",
          isSafe: false,
          feedback:
            "This is exactly the habit worth breaking, even when the email is genuine: links in unexpected security emails are one of the most common ways people end up on a fake login page. You'll see why in the Phishing module — for now, the safer move is always to type the site's address yourself.",
        },
      ],
    },
    {
      type: "question",
      prompt: "Your personal security habits and your school's organizational security are...",
      options: [
        { id: "a", text: "The same thing" },
        { id: "b", text: "Unrelated — one has nothing to do with the other" },
        { id: "c", text: "Both needed — you protect your own accounts, they protect the systems everyone shares" },
      ],
      correctOptionId: "c",
      explanation:
        "A strong password on your end doesn't help if the school's server is left unpatched — and a perfectly secure school network doesn't help if you reuse your password everywhere. Both layers matter, and neither replaces the other.",
    },
  ],
};
