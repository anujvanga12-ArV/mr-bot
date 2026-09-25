export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="bg-secondary h-7 w-64 animate-pulse rounded-md" />
        <div className="bg-secondary h-4 w-40 animate-pulse rounded-md" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border-border bg-secondary/50 h-32 animate-pulse rounded-lg border" />
        <div className="border-border bg-secondary/50 h-32 animate-pulse rounded-lg border" />
      </div>
    </div>
  );
}
