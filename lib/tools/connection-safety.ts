export interface ConnectionFact {
  id: string;
  label: string;
  value: string;
  detail: string;
}

/**
 * A browser genuinely cannot inspect the encryption type of the Wi-Fi
 * network it's connected to (WPA2 vs. WPA3, or open) — that information
 * isn't exposed to web pages, on purpose, for privacy reasons. This
 * function only reports what's actually checkable: whether the current
 * page's own connection is encrypted. The rest of the tool is a guided
 * self-assessment, not a scan, and says so.
 */
export function getKnownConnectionFacts(currentUrl: string): ConnectionFact[] {
  let isHttps = false;
  try {
    isHttps = new URL(currentUrl).protocol === "https:";
  } catch {
    isHttps = false;
  }

  return [
    {
      id: "page-https",
      label: "This page's connection",
      value: isHttps ? "Encrypted (HTTPS)" : "Not encrypted (HTTP)",
      detail: isHttps
        ? "Your connection to this specific site is encrypted end-to-end, regardless of which Wi-Fi network you're on."
        : "This connection isn't encrypted. That's a property of this site, not something your Wi-Fi network can fix.",
    },
  ];
}

export type NetworkTrust = "own-network" | "trusted-managed" | "public-unknown";

export interface NetworkGuidance {
  headline: string;
  detail: string;
  severity: "info" | "caution" | "warning";
}

export function getNetworkGuidance(trust: NetworkTrust, requiresPassword: boolean): NetworkGuidance {
  if (trust === "own-network") {
    return requiresPassword
      ? {
          headline: "A password-protected home network is a reasonable baseline",
          detail:
            "Worth checking separately: your router's admin password should be changed from its default — see the Devices & Wi-Fi module for why that specific setting matters most.",
          severity: "info",
        }
      : {
          headline: "An open home network is worth locking down",
          detail: "Set a Wi-Fi password on your router so only people you allow can join the network.",
          severity: "warning",
        };
  }

  if (trust === "trusted-managed") {
    return {
      headline: "Managed networks (school, workplace) are generally reasonable for everyday use",
      detail:
        "Still avoid entering sensitive information on any site that isn't using HTTPS, the same as you would anywhere else.",
      severity: "info",
    };
  }

  return {
    headline: "Treat public or unknown networks as untrusted",
    detail:
      "Avoid logging into sensitive accounts (banking, email) on a network you don't control. If you must, make sure the specific site uses HTTPS, or use your phone's personal hotspot instead.",
    severity: "caution",
  };
}
