"use client";

import { useState } from "react";
import {
  getKnownConnectionFacts,
  getNetworkGuidance,
  type NetworkTrust,
} from "@/lib/tools/connection-safety";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TRUST_OPTIONS: { value: NetworkTrust; label: string }[] = [
  { value: "own-network", label: "My own home network" },
  { value: "trusted-managed", label: "A managed network (school, workplace)" },
  { value: "public-unknown", label: "Public or unfamiliar Wi-Fi" },
];

const GUIDANCE_STYLES = {
  info: "border-border bg-secondary/50",
  caution: "border-accent/40 bg-accent/10",
  warning: "border-destructive/40 bg-destructive/10",
};

export function WifiChecker() {
  const [trust, setTrust] = useState<NetworkTrust | null>(null);
  const [requiresPassword, setRequiresPassword] = useState(true);

  const facts = getKnownConnectionFacts(
    typeof window !== "undefined" ? window.location.href : "https://example.com",
  );
  const guidance = trust ? getNetworkGuidance(trust, requiresPassword) : null;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-muted-foreground text-sm font-semibold">What we can actually check</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          A browser can&apos;t see your Wi-Fi network&apos;s own security type — that information is
          hidden from web pages on purpose. Here&apos;s what&apos;s actually verifiable from here:
        </p>
        <div className="mt-3 flex flex-col gap-2">
          {facts.map((fact) => (
            <div key={fact.id} className="border-border rounded-md border p-3 text-sm">
              <p className="font-medium">
                {fact.label}: {fact.value}
              </p>
              <p className="text-muted-foreground">{fact.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-muted-foreground text-sm font-semibold">Guided self-check</h2>
        <p className="text-muted-foreground mt-1 mb-3 text-sm">
          Answer honestly about the network you&apos;re on right now.
        </p>

        <p className="mb-2 text-sm font-medium">What kind of network is this?</p>
        <div className="flex flex-col gap-2">
          {TRUST_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setTrust(option.value)}
              className={cn(
                "rounded-md border px-4 py-2.5 text-left text-sm transition-colors",
                trust === option.value
                  ? "border-ring bg-secondary"
                  : "border-input hover:bg-secondary",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        {trust === "own-network" ? (
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              variant={requiresPassword ? "default" : "outline"}
              size="sm"
              onClick={() => setRequiresPassword(true)}
            >
              Has a password
            </Button>
            <Button
              type="button"
              variant={!requiresPassword ? "default" : "outline"}
              size="sm"
              onClick={() => setRequiresPassword(false)}
            >
              Open, no password
            </Button>
          </div>
        ) : null}
      </div>

      {guidance ? (
        <div className={cn("rounded-md border p-4 text-sm", GUIDANCE_STYLES[guidance.severity])}>
          <p className="font-medium">{guidance.headline}</p>
          <p className="text-muted-foreground mt-1">{guidance.detail}</p>
        </div>
      ) : null}
    </div>
  );
}
