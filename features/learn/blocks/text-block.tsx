import type { TextBlock } from "@/content/types";

export function TextBlockView({ block }: { block: TextBlock }) {
  const paragraphs = block.body.split("\n\n");

  return (
    <div className="flex flex-col gap-3 leading-relaxed text-foreground/90">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}
