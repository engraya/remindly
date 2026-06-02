"use client";

import { PageError } from "@/components/shared/PageError";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <PageError
          title="Application error"
          message={error.message}
          reset={reset}
        />
      </body>
    </html>
  );
}
