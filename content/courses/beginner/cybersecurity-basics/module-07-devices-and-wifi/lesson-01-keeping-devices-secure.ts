import type { Lesson } from "@/content/types";

export const keepingDevicesSecure: Lesson = {
  slug: "keeping-devices-secure",
  title: "Keeping Your Devices Secure",
  estimatedMinutes: 8,
  objective: "Apply basic device-hardening habits: updates, lock screens, and app permissions.",
  blocks: [
    {
      type: "text",
      body: "Every device you own — phone, laptop, tablet, even a game console — runs software that occasionally needs updating and holds settings that control what other apps and people can access. Most device security comes down to a small number of habits, applied consistently.",
    },
    {
      type: "text",
      body: "Lock screens matter more than they seem to, precisely because of the phone-on-the-table scenario from Module 1: a lock screen is the difference between a lost or momentarily unattended device being merely inconvenient, versus fully exposing everything on it.",
    },
    {
      type: "vocabulary",
      term: {
        term: "App permissions",
        simpleDefinition:
          "The specific things an app is allowed to access on your device — like your camera, location, or contacts.",
        technicalDefinition:
          "Granular access controls, enforced by the operating system, that gate an application's access to sensitive device capabilities and data. Modern mobile operating systems require explicit user consent per permission category, and permissions can typically be reviewed and revoked after installation, not just at install time.",
      },
    },
    {
      type: "scenario",
      setup:
        "You install a simple flashlight app, and it asks for permission to access your contacts and precise location. Should that seem normal?",
      choices: [
        {
          id: "seems-fine",
          text: "Sure — apps ask for permissions all the time, it's probably nothing.",
          isSafe: false,
          feedback:
            "A flashlight app has no functional reason to need your contacts or precise location — permission requests that don't match what an app actually does are a real signal worth noticing, not something to wave off as routine.",
        },
        {
          id: "question-it",
          text: "That's worth questioning — a flashlight app has no real reason to need contacts or location.",
          isSafe: true,
          feedback:
            "Right instinct. A useful habit: before granting a permission, ask whether the app's actual function requires it. If not, deny it — most apps still work fine with unrelated permissions turned off.",
        },
      ],
    },
    {
      type: "question",
      prompt: "What's a reasonable way to decide whether to grant an app a specific permission?",
      options: [
        { id: "a", text: "Grant everything an app asks for, since apps wouldn't ask without a reason" },
        { id: "b", text: "Consider whether the app's actual function genuinely requires that permission" },
      ],
      correctOptionId: "b",
      explanation:
        "Permissions unrelated to an app's core purpose are a common way apps (or malware disguised as apps) collect more than they need.",
    },
  ],
};
