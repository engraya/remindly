"use client";

import { Button } from "@/components/ui/button";

type PageErrorProps = {
  title?: string;
  message?: string;
  reset?: () => void;
};

export function PageError({
  title = "Something went wrong",
  message = "We could not load this page. Please try again.",
  reset,
}: PageErrorProps) {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-6 text-center"
      role="alert"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="max-w-md text-muted-foreground">{message}</p>
      {reset && (
        <Button type="button" variant="outline" onClick={reset}>
          Try again
        </Button>
      )}
    </div>
  );
}
