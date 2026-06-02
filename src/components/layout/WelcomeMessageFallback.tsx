import { Skeleton } from "@/components/ui/skeleton";

export function WelcomeMessageFallback() {
  return (
    <div className="mb-6 mt-6 flex flex-col items-center gap-3">
      <Skeleton className="h-20 w-20 rounded-full" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-4 w-48" />
    </div>
  );
}
