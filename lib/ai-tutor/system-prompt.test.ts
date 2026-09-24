import { describe, expect, it } from "vitest";
import { buildSystemPrompt } from "./system-prompt";

describe("buildSystemPrompt", () => {
  it("includes the firm safety boundaries regardless of level", () => {
    const prompt = buildSystemPrompt({ learningLevel: "advanced", explanationLevel: "technical" });
    expect(prompt).toContain("FIRM BOUNDARIES");
    expect(prompt).toContain("Never give step-by-step instructions for gaining unauthorized access");
  });

  it("reflects the requested explanation level", () => {
    const prompt = buildSystemPrompt({ learningLevel: "beginner", explanationLevel: "simple" });
    expect(prompt).toContain("Avoid jargon entirely");
  });

  it("omits lesson context when none is given", () => {
    const prompt = buildSystemPrompt({ learningLevel: "beginner", explanationLevel: "simple" });
    expect(prompt).not.toContain("CURRENT LESSON CONTEXT");
  });

  it("includes the lesson title when provided", () => {
    const prompt = buildSystemPrompt({
      learningLevel: "beginner",
      explanationLevel: "simple",
      lessonTitle: "What Is Phishing?",
    });
    expect(prompt).toContain('"What Is Phishing?"');
  });
});
