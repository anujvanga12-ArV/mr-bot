import type { Course } from "@/content/types";
import { codingModule01Basics } from "./module-01-python-basics";
import { codingModule02ControlFlow } from "./module-02-control-flow";
import { codingModule03FunctionsAndProject } from "./module-03-functions-and-project";

// The spec treats coding as secondary to the main cybersecurity curriculum,
// and it doesn't map cleanly onto the beginner/foundations/intermediate/
// advanced ladder the way the security courses do — "beginner" here means
// "no prior programming experience," not "the beginner security course."
export const pythonForSecurity: Course = {
  slug: "python-for-security",
  title: "Python for Security",
  level: "beginner",
  description:
    "Learn Python fundamentals through small, security-flavored examples — no prior programming experience needed.",
  modules: [codingModule01Basics, codingModule02ControlFlow, codingModule03FunctionsAndProject],
};
