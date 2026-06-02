import { Skeleton } from "@/components/ui/skeleton";

export function CollectionListSkeleton() {
  return (
    <div className="w-full space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="overflow-hidden rounded-lg border">
          <Skeleton className="h-14 w-full rounded-none" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-1 w-full" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-3/4 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
