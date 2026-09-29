import type { Module } from "@/content/types";
import { variablesAndDataTypes } from "./lesson-01-variables-and-data-types";
import { workingWithStrings } from "./lesson-02-working-with-strings";

export const codingModule01Basics: Module = {
  slug: "python-basics",
  title: "Python Basics",
  lessons: [variablesAndDataTypes, workingWithStrings],
};
