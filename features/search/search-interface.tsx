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
        className="border-input bg-background focus-visible:ring-ring h-11 rounded-md border px-4 text-sm outline-none focus-visible:ring-2"
      />

      {query.trim() && results.length === 0 ? (
        <p className="text-muted-foreground text-sm">No matches for &ldquo;{query}&rdquo;.</p>
      ) : null}

      <div className="flex flex-col gap-2">
        {results.map((result, i) => {
          const Icon = TYPE_ICON[result.type];
          return (
            <Link
              key={`${result.type}-${result.href}-${i}`}
              href={result.href}
              className="border-border hover:bg-secondary flex items-start gap-3 rounded-md border p-3 text-sm"
            >
              <Icon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
              <div>
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
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
