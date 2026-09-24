import { describe, expect, it } from "vitest";
import { getKnownConnectionFacts, getNetworkGuidance } from "./connection-safety";

describe("getKnownConnectionFacts", () => {
  it("reports HTTPS pages as encrypted", () => {
    const facts = getKnownConnectionFacts("https://example.com/tools/wifi-checker");
    expect(facts[0]?.value).toContain("Encrypted");
  });

  it("reports HTTP pages as not encrypted", () => {
    const facts = getKnownConnectionFacts("http://example.com");
    expect(facts[0]?.value).toContain("Not encrypted");
  });

  it("never claims to know the Wi-Fi network's own encryption type", () => {
    const facts = getKnownConnectionFacts("https://example.com");
    const allText = JSON.stringify(facts).toLowerCase();
    expect(allText).not.toContain("wpa2");
    expect(allText).not.toContain("wpa3");
  });
});

describe("getNetworkGuidance", () => {
  it("warns about an open home network", () => {
    const guidance = getNetworkGuidance("own-network", false);
    expect(guidance.severity).toBe("warning");
  });

  it("treats a password-protected home network as a reasonable baseline", () => {
    const guidance = getNetworkGuidance("own-network", true);
    expect(guidance.severity).toBe("info");
  });

  it("treats unknown public networks with caution regardless of password", () => {
    const guidance = getNetworkGuidance("public-unknown", true);
    expect(guidance.severity).toBe("caution");
  });
});
