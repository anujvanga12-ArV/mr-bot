"use client";

import { useState } from "react";
import type { VocabBlock } from "@/content/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function VocabBlockView({ block }: { block: VocabBlock }) {
  const [showTechnical, setShowTechnical] = useState(false);
  const { term } = block;

  return (
    <Card className="border-accent/30 bg-accent/5">
      <CardContent className="flex flex-col gap-2 pt-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-foreground/70">
          Term
        </p>
        <p className="text-lg font-semibold">{term.term}</p>
        <p className="text-sm text-foreground/80">{term.simpleDefinition}</p>

        {showTechnical ? (
          <p className="mt-2 border-t border-border pt-3 text-sm text-muted-foreground">
            {term.technicalDefinition}
          </p>
        ) : null}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-1 w-fit px-0 text-accent-foreground hover:bg-transparent hover:underline"
          onClick={() => setShowTechnical((v) => !v)}
        >
          {showTechnical ? "Hide technical definition" : "Learn the technical definition"}
        </Button>
      </CardContent>
    </Card>
  );
}
