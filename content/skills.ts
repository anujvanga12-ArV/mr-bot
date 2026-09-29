import type { LearningLevel } from "@/types/domain";

export interface SkillDefinition {
  slug: string;
  name: string;
  level: LearningLevel;
  category: string;
  description: string;
  /** A skill unlocks once every module listed here has all its lessons completed. */
  requiredModuleSlugs: string[];
}

export const BEGINNER_SKILLS: SkillDefinition[] = [
  {
    slug: "online-safety",
    name: "Online Safety",
    level: "beginner",
    category: "beginner",
    description: "Safe browsing, downloads, shared computers, and public Wi-Fi habits.",
    requiredModuleSlugs: ["staying-safe-online", "devices-and-wifi"],
  },
  {
    slug: "password-security",
    name: "Password Security",
    level: "beginner",
    category: "beginner",
    description: "Strong passwords, password managers, and multi-factor authentication.",
    requiredModuleSlugs: ["passwords-and-accounts"],
  },
  {
    slug: "phishing-awareness",
    name: "Phishing Awareness",
    level: "beginner",
    category: "beginner",
    description: "Spotting fake messages, fake login pages, and social engineering.",
    requiredModuleSlugs: ["phishing-and-scams"],
  },
  {
    slug: "account-security",
    name: "Account Security",
    level: "beginner",
    category: "beginner",
    description: "Recognizing manipulation tactics that target your accounts directly.",
    requiredModuleSlugs: ["social-engineering"],
  },
  {
    slug: "malware-awareness",
    name: "Malware Awareness",
    level: "beginner",
    category: "beginner",
    description: "What malware is, how it spreads, and how to avoid and detect it.",
    requiredModuleSlugs: ["malware"],
  },
  {
    slug: "privacy",
    name: "Privacy",
    level: "beginner",
    category: "beginner",
    description: "Personal information, social media privacy, and your digital footprint.",
    requiredModuleSlugs: ["social-media-safety"],
  },
];

export function getSkillsForLevel(level: LearningLevel): SkillDefinition[] {
  // Only beginner skills exist so far — Foundations/Intermediate/Advanced
  // skill trees get added here once those courses are written.
  return level === "beginner" ? BEGINNER_SKILLS : [];
}
