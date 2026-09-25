"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with real server-side logging (see lib/logger in a later phase).
    console.error(error);
  }, [error]);

  return (
    <div className="border-border flex flex-col items-center gap-3 rounded-lg border border-dashed py-16 text-center">
      <p className="font-medium">Something went wrong loading your dashboard.</p>
      <p className="text-muted-foreground max-w-sm text-sm">
        This has been logged. You can try again, or come back in a moment.
      </p>
      <Button onClick={reset} variant="outline" size="sm">
        Try again
      </Button>
    </div>
  );
}
