import { CODING_COURSE_SLUG, PRIMARY_SECURITY_COURSE_SLUG } from "./registry";

export type AchievementCriteria =
  | { type: "first_lesson" }
  | { type: "module_complete"; moduleSlug: string }
  | { type: "course_complete"; courseSlug: string };

export interface AchievementDefinition {
  slug: string;
  name: string;
  description: string;
  criteria: AchievementCriteria;
}

// Achievements from the spec's example list (Network Explorer, Linux
// Learner, Security Fundamentals, Threat Analyst) are intentionally left
// out — they belong to Foundations/Intermediate content that doesn't exist
// yet. An achievement with no way to actually earn it is exactly the "fake
// achievement" the spec rules out.
export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    slug: "first-steps",
    name: "First Steps",
    description: "Complete your first lesson.",
    criteria: { type: "first_lesson" },
  },
  {
    slug: "account-protector",
    name: "Account Protector",
    description: "Complete the Passwords & Accounts module.",
    criteria: { type: "module_complete", moduleSlug: "passwords-and-accounts" },
  },
  {
    slug: "scam-spotter",
    name: "Scam Spotter",
    description: "Complete the Phishing & Online Scams module.",
    criteria: { type: "module_complete", moduleSlug: "phishing-and-scams" },
  },
  {
    slug: "internet-safety-pro",
    name: "Internet Safety Pro",
    description: "Complete every module in Cybersecurity Basics.",
    criteria: { type: "course_complete", courseSlug: PRIMARY_SECURITY_COURSE_SLUG },
  },
  {
    slug: "code-ready",
    name: "Code Ready",
    description: "Complete every module in Python for Security.",
    criteria: { type: "course_complete", courseSlug: CODING_COURSE_SLUG },
  },
];
