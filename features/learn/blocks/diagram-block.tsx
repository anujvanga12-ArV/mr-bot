import type { DiagramBlock } from "@/content/types";

// Renders the diagram's source as a readable block rather than pulling in a
// diagramming library (e.g. mermaid) before any lesson actually needs one —
// wire that in when the first real diagram is authored, not speculatively.
export function DiagramBlockView({ block }: { block: DiagramBlock }) {
  return (
    <figure className="flex flex-col gap-2">
      <pre className="overflow-x-auto rounded-md border border-border bg-secondary/40 p-4 text-xs">
        {block.mermaid}
      </pre>
      {block.caption ? (
        <figcaption className="text-center text-xs text-muted-foreground">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
