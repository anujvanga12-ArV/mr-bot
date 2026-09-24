import type { Module } from "@/content/types";
import { personalInfoAndPrivacy } from "./lesson-01-personal-info-and-privacy";
import { safeBrowsingAndDownloads } from "./lesson-02-safe-browsing-and-downloads";
import { sharedComputersAndPublicWifi } from "./lesson-03-shared-computers-and-public-wifi";

export const module02StayingSafeOnline: Module = {
  slug: "staying-safe-online",
  title: "Staying Safe Online",
  lessons: [personalInfoAndPrivacy, safeBrowsingAndDownloads, sharedComputersAndPublicWifi],
};
