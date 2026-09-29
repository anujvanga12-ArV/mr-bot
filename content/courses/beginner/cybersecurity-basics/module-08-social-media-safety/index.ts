import type { Module } from "@/content/types";
import { privacySettingsAndOversharing } from "./lesson-01-privacy-settings-and-oversharing";
import { spottingFakeProfiles } from "./lesson-02-spotting-fake-profiles";
import { yourDigitalFootprint } from "./lesson-03-your-digital-footprint";

export const module08SocialMediaSafety: Module = {
  slug: "social-media-safety",
  title: "Social Media Safety",
  lessons: [privacySettingsAndOversharing, spottingFakeProfiles, yourDigitalFootprint],
};
