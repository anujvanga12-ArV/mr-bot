"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, KeyRound, Wrench } from "lucide-react";
import { search, type SearchEntry } from "@/lib/search";

const TYPE_LABEL: Record<SearchEntry["type"], string> = {
  vocabulary: "Vocabulary",
  lesson: "Lesson",
  tool: "Tool",
};

const TYPE_ICON: Record<SearchEntry["type"], typeof BookOpen> = {
  vocabulary: KeyRound,
  lesson: BookOpen,
  tool: Wrench,
};

export function SearchInterface() {
  const [query, setQuery] = useState("");
  const results = search(query);

  return (
    <div className="flex flex-col gap-6">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search terms, lessons, and tools…"
        autoFocus
        className="h-11 rounded-md border border-input bg-background px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />

      {query.trim() && results.length === 0 ? (
        <p className="text-sm text-muted-foreground">No matches for &ldquo;{query}&rdquo;.</p>
      ) : null}

      <div className="flex flex-col gap-2">
        {results.map((result, i) => {
          const Icon = TYPE_ICON[result.type];
          return (
            <Link
              key={`${result.type}-${result.href}-${i}`}
              href={result.href}
              className="flex items-start gap-3 rounded-md border border-border p-3 text-sm hover:bg-secondary"
            >
              <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {TYPE_LABEL[result.type]}
                </p>
                <p className="font-medium">{result.primaryText}</p>
                <p className="text-muted-foreground">{result.secondaryText}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
