import type { Lesson } from "@/content/types";

export const safeBrowsingAndDownloads: Lesson = {
  slug: "safe-browsing-and-downloads",
  title: "Safe Browsing and Downloads",
  estimatedMinutes: 8,
  objective:
    "Recognize suspicious websites and downloads, and know what to do when a site asks you to install something.",
  blocks: [
    {
      type: "text",
      body: 'Most websites you visit don\'t need you to install anything. When one suddenly does — especially to "continue," "unlock," or "view" something you were already trying to do — that\'s worth pausing on. Legitimate sites you already trust (your school portal, a streaming service, a search engine) essentially never require a surprise download partway through.',
    },
    {
      type: "vocabulary",
      term: {
        term: "Suspicious download",
        simpleDefinition:
          'A file a website wants you to install that you didn\'t go looking for, especially one that appears as a pop-up or a "required" step.',
        technicalDefinition:
          "Files distributed via drive-by prompts, deceptive UI (fake 'download' buttons styled to look like site content), or bundled installers. These are common delivery methods for adware and, less often, more serious malware — the file's origin and the pressure to install it matter more than what it claims to be.",
      },
    },
    {
      type: "scenario",
      setup:
        "You're using a computer at school or the library. A website you're on shows a pop-up: \"To continue viewing this content, please download our free viewer.\" What should you do?",
      choices: [
        {
          id: "download-it",
          text: "Download it — the site said it's required to continue.",
          isSafe: false,
          feedback:
            "A website telling you a download is \"required\" doesn't make it true — and doesn't make it safe. Real video players, PDF viewers, and similar tools are things you install once, from their official source, not something a random webpage prompts mid-visit.",
        },
        {
          id: "close-and-leave",
          text: "Close the pop-up and leave the site without downloading anything.",
          isSafe: true,
          feedback:
            "Exactly right. If the content genuinely requires special software, you can find that software from its real, official website later — not from a link a random page handed you.",
        },
        {
          id: "ask-staff",
          text: "On a shared school/library computer, also let staff know what happened.",
          isSafe: true,
          feedback:
            "A good addition on a shared computer specifically — if the prompt was tied to something already on the machine (like unwanted software), staff may need to check it before the next person uses it.",
        },
      ],
    },
    {
      type: "text",
      body: "A few more patterns that should make you slow down before clicking:\n\n• A web address that's almost right but not quite (an extra word, a different ending, misspelled brand name).\n• A page that looks broken, overly flashy, or covered in fake \"system warning\" banners.\n• Anything claiming your device already has a virus and offering a fix.\n\nNone of these guarantee danger by themselves, but together they're exactly the pattern a fake or malicious site is built to create.",
    },
    {
      type: "question",
      prompt:
        'A site claims you must install a "required" viewer to see its content. What\'s true here?',
      options: [
        {
          id: "a",
          text: "Legitimate content almost never requires a surprise mid-visit download, so this is a red flag",
        },
        { id: "b", text: "It's definitely safe as long as the pop-up looks professional" },
        { id: "c", text: "It's fine to install if you're only doing it once" },
      ],
      correctOptionId: "a",
      explanation:
        'The claim of being "required" is doing the persuading, not the software itself. Real tools you might actually need are worth getting from their own official site, on your own terms — not from a prompt embedded in someone else\'s page.',
    },
  ],
};
