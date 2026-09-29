import type { ActivityBlock } from "@/content/types";

// No lesson uses this yet (see the architecture notes on deferring
// drag-and-drop/matching/ordering until a second activity kind justifies
// the shared plumbing). This renders honestly rather than faking
// interactivity if content ever references one before the UI exists.
export function ActivityBlockView({ block }: { block: ActivityBlock }) {
  return (
    <div className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">
      <p className="font-medium text-foreground">{block.prompt}</p>
      <p className="mt-1">
        This {block.kind.replace("-", " ")} activity isn&apos;t built yet — tracked for a future
        pass.
      </p>
    </div>
  );
}
