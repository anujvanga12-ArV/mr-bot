import type { Module } from "@/content/types";
import { whatIsPhishing } from "./lesson-01-what-is-phishing";
import { fakeMessagesAndFakePages } from "./lesson-02-fake-messages-and-fake-pages";
import { practiceIdentifyingPhishing } from "./lesson-03-practice-identifying-phishing";

export const module04PhishingAndScams: Module = {
  slug: "phishing-and-scams",
  title: "Phishing & Online Scams",
  lessons: [whatIsPhishing, fakeMessagesAndFakePages, practiceIdentifyingPhishing],
};
