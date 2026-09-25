import { UrlAnalyzer } from "@/features/tools/url-analyzer/url-analyzer";

export const metadata = { title: "URL Analyzer" };

export default function UrlAnalyzerPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">URL Analyzer</h1>
        <p className="text-muted-foreground mt-1">
          Paste a URL to see how it&apos;s structured. This checks structure only — it can&apos;t
          confirm a site&apos;s actual content is safe or malicious.
        </p>
      </div>
      <UrlAnalyzer />
    </div>
  );
}
