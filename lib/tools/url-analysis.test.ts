import { describe, expect, it } from "vitest";
import { analyzeUrl } from "./url-analysis";

function indicatorIds(result: ReturnType<typeof analyzeUrl>): string[] {
  return result.isValid ? result.indicators.map((i) => i.id) : [];
}

describe("analyzeUrl", () => {
  it("rejects empty input", () => {
    const result = analyzeUrl("   ");
    expect(result.isValid).toBe(false);
  });

  it("rejects unparseable input", () => {
    const result = analyzeUrl("not a url at all !!!");
    expect(result.isValid).toBe(false);
  });

  it("assumes https when no scheme is given, like a browser address bar", () => {
    const result = analyzeUrl("example.com");
    expect(result.isValid).toBe(true);
    if (result.isValid) {
      expect(result.protocol).toBe("https:");
      expect(result.isHttps).toBe(true);
    }
  });

  it("flags a plain http URL", () => {
    const result = analyzeUrl("http://example.com");
    expect(indicatorIds(result)).toContain("not-https");
  });

  it("flags a raw IP address host", () => {
    const result = analyzeUrl("http://192.168.1.1/login");
    expect(indicatorIds(result)).toContain("ip-address-host");
  });

  it("flags an @ symbol used to disguise the real destination", () => {
    const result = analyzeUrl("https://accounts.example.com@malicious.test/login");
    expect(indicatorIds(result)).toContain("at-symbol");
  });

  it("flags punycode domains", () => {
    const result = analyzeUrl("https://xn--pple-43d.com");
    expect(indicatorIds(result)).toContain("punycode");
  });

  it("flags an excessive subdomain chain", () => {
    const result = analyzeUrl("https://secure.login.accounts.example.malicious.test");
    expect(indicatorIds(result)).toContain("many-subdomains");
  });

  it("flags a hyphen-heavy domain label", () => {
    const result = analyzeUrl("https://brand-secure-verify-login.com");
    expect(indicatorIds(result)).toContain("hyphen-heavy");
  });

  it("reports no flags for a clean, ordinary HTTPS URL", () => {
    const result = analyzeUrl("https://www.example.com/path?query=1");
    expect(indicatorIds(result)).toEqual(["no-flags"]);
  });

  it("never returns a bare safe/malicious verdict field", () => {
    const result = analyzeUrl("https://example.com");
    expect(result).not.toHaveProperty("isSafe");
    expect(result).not.toHaveProperty("isMalicious");
  });
});
