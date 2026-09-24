export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="h-7 w-64 animate-pulse rounded-md bg-secondary" />
        <div className="h-4 w-40 animate-pulse rounded-md bg-secondary" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-32 animate-pulse rounded-lg border border-border bg-secondary/50" />
        <div className="h-32 animate-pulse rounded-lg border border-border bg-secondary/50" />
      </div>
    </div>
  );
}
