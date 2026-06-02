"use client";

import { PageError } from "@/components/shared/PageError";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-background">
      <PageError
        title="Dashboard unavailable"
        message={error.message || "We could not load your dashboard."}
        reset={reset}
      />
    </main>
  );
}
