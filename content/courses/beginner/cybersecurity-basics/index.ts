import type { Course } from "@/content/types";
import { module01Welcome } from "./module-01-welcome";
import { module02StayingSafeOnline } from "./module-02-staying-safe-online";
import { module03PasswordsAndAccounts } from "./module-03-passwords-and-accounts";
import { module04PhishingAndScams } from "./module-04-phishing-and-scams";
import { module05SocialEngineering } from "./module-05-social-engineering";
import { module06Malware } from "./module-06-malware";
import { module07DevicesAndWifi } from "./module-07-devices-and-wifi";
import { module08SocialMediaSafety } from "./module-08-social-media-safety";
import { module09BeginnerChallenge } from "./module-09-beginner-challenge";

export const cybersecurityBasics: Course = {
  slug: "cybersecurity-basics",
  title: "Cybersecurity Basics",
  level: "beginner",
  description:
    "Start here if cybersecurity is new to you. No prior knowledge required — just curiosity.",
  modules: [
    module01Welcome,
    module02StayingSafeOnline,
    module03PasswordsAndAccounts,
    module04PhishingAndScams,
    module05SocialEngineering,
    module06Malware,
    module07DevicesAndWifi,
    module08SocialMediaSafety,
    module09BeginnerChallenge,
  ],
};
