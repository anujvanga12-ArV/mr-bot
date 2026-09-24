import type { ContentBlock } from "@/content/types";
import { TextBlockView } from "./blocks/text-block";
import { VocabBlockView } from "./blocks/vocab-block";
import { ScenarioBlockView } from "./blocks/scenario-block";
import { KnowledgeCheckBlockView } from "./blocks/knowledge-check-block";
import { CodeBlockView } from "./blocks/code-block";
import { ImageBlockView } from "./blocks/image-block";
import { DiagramBlockView } from "./blocks/diagram-block";
import { ActivityBlockView } from "./blocks/activity-block";

function renderBlock(block: ContentBlock, key: number) {
  switch (block.type) {
    case "text":
      return <TextBlockView key={key} block={block} />;
    case "vocabulary":
      return <VocabBlockView key={key} block={block} />;
    case "scenario":
      return <ScenarioBlockView key={key} block={block} />;
    case "question":
      return <KnowledgeCheckBlockView key={key} block={block} />;
    case "code":
      return <CodeBlockView key={key} block={block} />;
    case "image":
      return <ImageBlockView key={key} block={block} />;
    case "diagram":
      return <DiagramBlockView key={key} block={block} />;
    case "activity":
      return <ActivityBlockView key={key} block={block} />;
    default: {
      // Exhaustiveness check: a new ContentBlock variant without a case
      // here fails the build instead of silently rendering nothing.
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

export function LessonRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}
