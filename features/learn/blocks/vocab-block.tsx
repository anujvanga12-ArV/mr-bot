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
        <p className="text-accent-foreground/70 text-sm font-semibold tracking-wide uppercase">
          Term
        </p>
        <p className="text-lg font-semibold">{term.term}</p>
        <p className="text-foreground/80 text-sm">{term.simpleDefinition}</p>

        {showTechnical ? (
          <p className="border-border text-muted-foreground mt-2 border-t pt-3 text-sm">
            {term.technicalDefinition}
          </p>
        ) : null}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-accent-foreground mt-1 w-fit px-0 hover:bg-transparent hover:underline"
          onClick={() => setShowTechnical((v) => !v)}
        >
          {showTechnical ? "Hide technical definition" : "Learn the technical definition"}
        </Button>
      </CardContent>
    </Card>
  );
}
