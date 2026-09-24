import type { Module } from "@/content/types";
import { conditionals } from "./lesson-01-conditionals";
import { loops } from "./lesson-02-loops";

export const codingModule02ControlFlow: Module = {
  slug: "control-flow",
  title: "Control Flow",
  lessons: [conditionals, loops],
};
