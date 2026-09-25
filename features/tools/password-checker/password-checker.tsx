"use client";

import { useState } from "react";
import { analyzePassword, type PasswordStrength } from "@/lib/tools/password-analysis";
import { cn } from "@/lib/utils";

const STRENGTH_LABEL: Record<PasswordStrength, string> = {
  "very-weak": "Very weak",
  weak: "Weak",
  fair: "Fair",
  strong: "Strong",
  "very-strong": "Very strong",
};

const STRENGTH_WIDTH: Record<PasswordStrength, string> = {
  "very-weak": "20%",
  weak: "40%",
  fair: "60%",
  strong: "80%",
  "very-strong": "100%",
};

const STRENGTH_COLOR: Record<PasswordStrength, string> = {
  "very-weak": "bg-destructive",
  weak: "bg-destructive",
  fair: "bg-accent",
  strong: "bg-emerald-500",
  "very-strong": "bg-emerald-500",
};

function CheckItem({ label, met }: { label: string; met: boolean }) {
  return (
    <div
      className={cn(
        "rounded-md border px-3 py-2 text-center text-xs font-medium",
        met
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          : "border-border text-muted-foreground",
      )}
    >
      {label}
    </div>
  );
}

export function PasswordChecker() {
  const [value, setValue] = useState("");
  const result = analyzePassword(value);

  return (
    <div className="flex flex-col gap-6">
      <div className="border-accent/40 bg-accent/10 rounded-md border p-3 text-sm">
        Only test made-up example strings here — never a real password. Nothing typed here is sent
        anywhere or stored; it&apos;s all evaluated in your browser.
      </div>

      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type an example password…"
        autoComplete="off"
        spellCheck={false}
        className="border-input bg-background focus-visible:ring-ring h-10 rounded-md border px-3 text-sm outline-none focus-visible:ring-2"
      />

      <div>
        <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
          <div
            className={cn("h-full rounded-full transition-all", STRENGTH_COLOR[result.strength])}
            style={{ width: value ? STRENGTH_WIDTH[result.strength] : "0%" }}
          />
        </div>
        <p className="mt-2 text-sm font-medium">{value ? STRENGTH_LABEL[result.strength] : "—"}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <CheckItem label="8+ characters" met={result.length >= 8} />
        <CheckItem label="Lowercase" met={result.hasLower} />
        <CheckItem label="Uppercase" met={result.hasUpper} />
        <CheckItem label="Number or symbol" met={result.hasDigit || result.hasSymbol} />
      </div>

      {result.patterns.length > 0 ? (
        <div className="flex flex-col gap-2">
          {result.patterns.map((pattern) => (
            <div
              key={pattern.id}
              className="border-destructive/40 bg-destructive/10 rounded-md border p-3 text-sm"
            >
              <p className="font-medium">{pattern.label}</p>
              <p className="text-muted-foreground">{pattern.detail}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
