import Image from "next/image";
import type { ImageBlock } from "@/content/types";

export function ImageBlockView({ block }: { block: ImageBlock }) {
  return (
    <figure className="flex flex-col gap-2">
      <div className="border-border overflow-hidden rounded-md border">
        <Image
          src={block.src}
          alt={block.alt}
          width={800}
          height={450}
          className="h-auto w-full object-cover"
        />
      </div>
      {block.caption ? (
        <figcaption className="text-muted-foreground text-center text-xs">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
