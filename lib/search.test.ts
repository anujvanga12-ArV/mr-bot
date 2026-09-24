import { describe, expect, it } from "vitest";
import { search } from "./search";

describe("search", () => {
  it("returns nothing for an empty query", () => {
    expect(search("")).toEqual([]);
    expect(search("   ")).toEqual([]);
  });

  it("finds a known vocabulary term by exact name", () => {
    const results = search("phishing");
    const match = results.find((r) => r.type === "vocabulary" && r.term === "Phishing");
    expect(match).toBeDefined();
  });

  it("ranks an exact/prefix match above a description-only match", () => {
    const results = search("password");
    const firstResult = results[0];
    expect(firstResult).toBeDefined();
    expect(firstResult?.primaryText.toLowerCase()).toContain("password");
  });

  it("finds a known tool by name", () => {
    const results = search("url analyzer");
    expect(results.some((r) => r.type === "tool" && r.title === "URL Analyzer")).toBe(true);
  });

  it("finds a lesson via its title", () => {
    const results = search("what is phishing");
    expect(results.some((r) => r.type === "lesson")).toBe(true);
  });

  it("is case-insensitive", () => {
    const lower = search("malware");
    const upper = search("MALWARE");
    expect(upper.length).toBe(lower.length);
  });

  it("returns no results for gibberish", () => {
    expect(search("zzzznonexistentqueryxyz")).toEqual([]);
  });

  it("caps results at a reasonable number", () => {
    // A very common letter should match plenty of entries if uncapped.
    const results = search("e");
    expect(results.length).toBeLessThanOrEqual(20);
  });
});
