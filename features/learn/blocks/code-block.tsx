import type { CodeBlock } from "@/content/types";

export function CodeBlockView({ block }: { block: CodeBlock }) {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className="border-b border-border bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground">
        {block.language}
      </div>
      <pre className="overflow-x-auto bg-card p-4 text-sm">
        <code>{block.code}</code>
      </pre>
    </div>
  );
}
