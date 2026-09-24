export interface UrlIndicator {
  id: string;
  label: string;
  detail: string;
  severity: "info" | "caution" | "warning";
}

export type UrlAnalysisResult =
  | {
      isValid: true;
      href: string;
      protocol: string;
      isHttps: boolean;
      hostname: string;
      domain: string;
      subdomains: string[];
      pathname: string;
      search: string;
      indicators: UrlIndicator[];
    }
  | { isValid: false; error: string };

const IPV4_PATTERN = /^(\d{1,3}\.){3}\d{1,3}$/;
const SUSPICIOUS_HYPHEN_THRESHOLD = 2;
const MANY_SUBDOMAINS_THRESHOLD = 3;

/**
 * Checks a URL's *structure* for patterns commonly seen in look-alike or
 * disguised links. Deliberately never concludes "safe" or "malicious" —
 * only a real threat-intelligence lookup could say that, and this tool
 * doesn't have one. See the "no-flags" indicator for how that limit is
 * communicated back to the user.
 */
export function analyzeUrl(rawInput: string): UrlAnalysisResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { isValid: false, error: "Enter a URL to check." };
  }

  let url: URL;
  try {
    url = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
  } catch {
    return { isValid: false, error: "That doesn't look like a valid URL." };
  }

  const hostname = url.hostname;
  const isHttps = url.protocol === "https:";
  const isIpAddress = IPV4_PATTERN.test(hostname);
  const hostnameParts = hostname.split(".");
  const subdomains = hostnameParts.length > 2 ? hostnameParts.slice(0, -2) : [];
  const domainLabel = hostnameParts.length >= 2 ? hostnameParts[hostnameParts.length - 2] : hostname;

  const indicators: UrlIndicator[] = [];

  if (!isHttps) {
    indicators.push({
      id: "not-https",
      label: "Not using HTTPS",
      detail:
        "This connection wouldn't be encrypted. Avoid entering passwords or personal information on a page like this.",
      severity: "warning",
    });
  }

  if (isIpAddress) {
    indicators.push({
      id: "ip-address-host",
      label: "Uses a raw IP address instead of a domain name",
      detail:
        "Legitimate sites almost always use a named domain. A bare IP address as the destination is unusual and worth extra caution.",
      severity: "caution",
    });
  }

  if (trimmed.includes("@") && !isIpAddress) {
    indicators.push({
      id: "at-symbol",
      label: 'Contains an "@" symbol',
      detail:
        'Browsers ignore everything before an "@" in a URL. Text before it can be styled to look like a trusted site while the link actually points elsewhere.',
      severity: "warning",
    });
  }

  if (hostname.includes("xn--")) {
    indicators.push({
      id: "punycode",
      label: "Uses punycode (an encoded international domain name)",
      detail:
        "This can be entirely legitimate, but it's also how look-alike domains built from non-Latin characters that resemble familiar letters are sometimes made. Worth a closer look.",
      severity: "caution",
    });
  }

  if (subdomains.length >= MANY_SUBDOMAINS_THRESHOLD) {
    indicators.push({
      id: "many-subdomains",
      label: "Unusually many subdomains",
      detail:
        "A long chain of subdomains is sometimes used to bury a suspicious real domain at the end, while a familiar-looking name appears at the start.",
      severity: "caution",
    });
  }

  const hyphenCount = domainLabel ? (domainLabel.match(/-/g)?.length ?? 0) : 0;
  if (hyphenCount >= SUSPICIOUS_HYPHEN_THRESHOLD) {
    indicators.push({
      id: "hyphen-heavy",
      label: "Domain name has multiple hyphens",
      detail:
        'Not inherently unsafe, but domains that pad a brand name with extra words (like "brand-secure-verify.com") are a common look-alike pattern.',
      severity: "caution",
    });
  }

  if (indicators.length === 0) {
    indicators.push({
      id: "no-flags",
      label: "No structural red flags found",
      detail:
        "This checks the URL's structure only — it can't confirm the site's actual content or intent is trustworthy. Structural cleanliness isn't a guarantee of safety.",
      severity: "info",
    });
  }

  return {
    isValid: true,
    href: url.href,
    protocol: url.protocol,
    isHttps,
    hostname,
    domain: hostnameParts.slice(-2).join("."),
    subdomains,
    pathname: url.pathname,
    search: url.search,
    indicators,
  };
}
