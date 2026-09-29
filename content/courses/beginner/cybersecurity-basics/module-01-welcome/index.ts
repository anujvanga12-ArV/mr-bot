import type { Module } from "@/content/types";
import { whatIsCybersecurity } from "./lesson-01-what-is-cybersecurity";
import { cybersecurityInDailyLife } from "./lesson-02-cybersecurity-in-daily-life";
import { whatProfessionalsDo } from "./lesson-03-what-professionals-do";

export const module01Welcome: Module = {
  slug: "welcome-to-cybersecurity",
  title: "Welcome to Cybersecurity",
  lessons: [whatIsCybersecurity, cybersecurityInDailyLife, whatProfessionalsDo],
};
