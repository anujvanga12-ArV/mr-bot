import type { Module } from "@/content/types";
import { functionsAndLists } from "./lesson-01-functions-and-lists";
import { miniProjectPasswordChecker } from "./lesson-02-mini-project-password-checker";

export const codingModule03FunctionsAndProject: Module = {
  slug: "functions-and-project",
  title: "Functions & Mini Project",
  lessons: [functionsAndLists, miniProjectPasswordChecker],
};
