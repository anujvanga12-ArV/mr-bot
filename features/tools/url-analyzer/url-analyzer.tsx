"use client";

import { useState } from "react";
import { analyzeUrl, type UrlAnalysisResult } from "@/lib/tools/url-analysis";
import { Button } from "@/components/ui/button";
import { IndicatorList } from "@/features/tools/indicator-list";

export function UrlAnalyzer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<UrlAnalysisResult | null>(null);

  function handleCheck(event: React.FormEvent) {
    event.preventDefault();
    setResult(analyzeUrl(input));
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Paste a URL, e.g. example.com/login"
          autoComplete="off"
          className="border-input bg-background focus-visible:ring-ring h-10 flex-1 rounded-md border px-3 text-sm outline-none focus-visible:ring-2"
        />
        <Button type="submit">Check</Button>
      </form>

      {result && !result.isValid ? (
        <p className="text-destructive text-sm">{result.error}</p>
      ) : null}

      {result && result.isValid ? (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div>
              <p className="text-muted-foreground">Protocol</p>
              <p className="font-medium">{result.protocol}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Domain</p>
              <p className="font-medium">{result.domain}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Subdomains</p>
              <p className="font-medium">
                {result.subdomains.length > 0 ? result.subdomains.join(".") : "none"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Path</p>
              <p className="truncate font-medium">{result.pathname || "/"}</p>
            </div>
          </div>

          <IndicatorList indicators={result.indicators} />
        </div>
      ) : null}
    </div>
  );
}
