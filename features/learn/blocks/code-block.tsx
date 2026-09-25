import type { CodeBlock } from "@/content/types";

export function CodeBlockView({ block }: { block: CodeBlock }) {
  return (
    <div className="border-border overflow-hidden rounded-md border">
      <div className="border-border bg-secondary text-muted-foreground border-b px-4 py-1.5 text-xs font-medium">
        {block.language}
      </div>
      <pre className="bg-card overflow-x-auto p-4 text-sm">
        <code>{block.code}</code>
      </pre>
    </div>
  );
}
