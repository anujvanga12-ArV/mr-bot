import type { Module } from "@/content/types";
import { howSocialEngineeringWorks } from "./lesson-01-how-social-engineering-works";
import { socialEngineeringInGamingAndSchool } from "./lesson-02-gaming-and-school";
import { groupChatsAndCommunities } from "./lesson-03-group-chats-and-communities";

export const module05SocialEngineering: Module = {
  slug: "social-engineering",
  title: "Social Engineering",
  lessons: [
    howSocialEngineeringWorks,
    socialEngineeringInGamingAndSchool,
    groupChatsAndCommunities,
  ],
};
