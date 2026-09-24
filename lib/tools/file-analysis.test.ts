import { describe, expect, it } from "vitest";
import { analyzeFileMetadata } from "./file-analysis";

describe("analyzeFileMetadata", () => {
  it("flags a double extension disguising an executable as a document", () => {
    const result = analyzeFileMetadata({ name: "Invoice_2024.pdf.exe", size: 1024, type: "" });
    expect(result.hasDoubleExtensionRisk).toBe(true);
    expect(result.indicators.map((i) => i.id)).toContain("double-extension");
  });

  it("flags a plain executable without claiming it's a double extension", () => {
    const result = analyzeFileMetadata({ name: "setup.exe", size: 2048, type: "application/x-msdownload" });
    expect(result.hasDoubleExtensionRisk).toBe(false);
    expect(result.indicators.map((i) => i.id)).toContain("executable-extension");
  });

  it("flags an empty file", () => {
    const result = analyzeFileMetadata({ name: "photo.png", size: 0, type: "image/png" });
    expect(result.indicators.map((i) => i.id)).toContain("empty-file");
  });

  it("reports no flags for an ordinary document", () => {
    const result = analyzeFileMetadata({ name: "notes.pdf", size: 34000, type: "application/pdf" });
    expect(result.indicators.map((i) => i.id)).toEqual(["no-flags"]);
  });

  it("handles a file with no extension at all", () => {
    const result = analyzeFileMetadata({ name: "README", size: 512, type: "" });
    expect(result.finalExtension).toBeNull();
    expect(result.hasDoubleExtensionRisk).toBe(false);
  });

  it("never returns a fake infected/clean verdict", () => {
    const result = analyzeFileMetadata({ name: "document.docx", size: 500, type: "" });
    expect(result).not.toHaveProperty("isInfected");
    expect(result).not.toHaveProperty("isSafe");
    expect(result).not.toHaveProperty("verdict");
  });
});
