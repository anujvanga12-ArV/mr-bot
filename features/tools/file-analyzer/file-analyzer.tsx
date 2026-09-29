"use client";

import { useState } from "react";
import { analyzeFileMetadata, computeSha256, type FileAnalysisResult } from "@/lib/tools/file-analysis";
import { IndicatorList } from "@/features/tools/indicator-list";

export function FileAnalyzer() {
  const [result, setResult] = useState<FileAnalysisResult | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [isHashing, setIsHashing] = useState(false);

  async function handleFile(file: File) {
    setResult(analyzeFileMetadata(file));
    setHash(null);
    setIsHashing(true);
    try {
      setHash(await computeSha256(file));
    } catch {
      setHash(null);
    } finally {
      setIsHashing(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-md border border-accent/40 bg-accent/10 p-3 text-sm">
        This checks a file&apos;s name, extension, and size, and computes its hash — entirely in
        your browser. The file itself is never uploaded anywhere. It isn&apos;t a real antivirus
        scan: it can&apos;t see inside the file&apos;s actual contents.
      </div>

      <input
        type="file"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleFile(file);
        }}
        className="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm file:font-medium"
      />

      {result ? (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="truncate font-medium">{result.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Size</p>
              <p className="font-medium">{result.size.toLocaleString()} bytes</p>
            </div>
            <div>
              <p className="text-muted-foreground">Reported type</p>
              <p className="truncate font-medium">{result.declaredType}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">SHA-256</p>
            <p className="break-all font-mono text-xs">
              {isHashing ? "Computing…" : (hash ?? "Unavailable")}
            </p>
          </div>

          <IndicatorList indicators={result.indicators} />
        </div>
      ) : null}
    </div>
  );
}
