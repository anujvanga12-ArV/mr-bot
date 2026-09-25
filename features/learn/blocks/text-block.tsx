import type { TextBlock } from "@/content/types";

export function TextBlockView({ block }: { block: TextBlock }) {
  const paragraphs = block.body.split("\n\n");

  return (
    <div className="text-foreground/90 flex flex-col gap-3 leading-relaxed">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
}
