import { SearchInterface } from "@/features/search/search-interface";

export const metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Search</h1>
        <p className="text-muted-foreground mt-1">
          Look up a term, find a lesson, or jump to a tool.
        </p>
      </div>
      <SearchInterface />
    </div>
  );
}
