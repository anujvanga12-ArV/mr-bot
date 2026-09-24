import { describe, expect, it } from "vitest";
import { analyzePassword } from "./password-analysis";

describe("analyzePassword", () => {
  it("rates an empty password as very weak", () => {
    expect(analyzePassword("").strength).toBe("very-weak");
  });

  it("flags a common password by name", () => {
    const result = analyzePassword("password");
    expect(result.patterns.map((p) => p.id)).toContain("common-password");
    expect(result.strength).toBe("very-weak");
  });

  it("flags a sequential keyboard run", () => {
    const result = analyzePassword("qwerty1234");
    expect(result.patterns.map((p) => p.id)).toContain("sequential-run");
  });

  it("flags a repeated-character run", () => {
    const result = analyzePassword("aaaa1234xyz");
    expect(result.patterns.map((p) => p.id)).toContain("repeated-character");
  });

  it("flags a year-like number", () => {
    const result = analyzePassword("Summer2024");
    expect(result.patterns.map((p) => p.id)).toContain("year-like-number");
  });

  it("rates a long, varied, pattern-free passphrase as strong or better", () => {
    const result = analyzePassword("lamp-giraffe-orbit-window");
    expect(["strong", "very-strong"]).toContain(result.strength);
    expect(result.patterns).toHaveLength(0);
  });

  it("scores a longer password at least as well as a shorter one with the same character variety", () => {
    const scoreOf = (s: string) =>
      ["very-weak", "weak", "fair", "strong", "very-strong"].indexOf(analyzePassword(s).strength);
    expect(scoreOf("Ax9!aaaaaaaaaaaaaaaaaaaa")).toBeGreaterThanOrEqual(scoreOf("Ax9!aaa"));
  });

  it("correctly reports character variety flags", () => {
    const result = analyzePassword("Ax9!");
    expect(result.hasLower).toBe(true);
    expect(result.hasUpper).toBe(true);
    expect(result.hasDigit).toBe(true);
    expect(result.hasSymbol).toBe(true);
    expect(result.varietyCount).toBe(4);
  });

  it("never returns a fake precise crack-time figure", () => {
    const result = analyzePassword("whatever123");
    expect(result).not.toHaveProperty("crackTime");
    expect(result).not.toHaveProperty("timeToCrack");
  });
});
