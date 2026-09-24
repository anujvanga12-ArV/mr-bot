import { FileAnalyzer } from "@/features/tools/file-analyzer/file-analyzer";

export const metadata = { title: "File Analyzer" };

export default function FileAnalyzerPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">File Analyzer</h1>
        <p className="mt-1 text-muted-foreground">
          Check a file&apos;s name, extension, and size before opening it. Nothing is uploaded —
          this runs entirely in your browser.
        </p>
      </div>
      <FileAnalyzer />
    </div>
  );
}
