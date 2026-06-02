"use client";

import { useState } from "react";
import type { Collection } from "@/features/collections/types";

export type SortKey =
  | "newest"
  | "oldest"
  | "name-asc"
  | "most-complete"
  | "least-complete";

function getCompletionPct(collection: Collection): number {
  if (collection.tasks.length === 0) return 0;
  return collection.tasks.filter((t) => t.done).length / collection.tasks.length;
}

function sortCollections(
  collections: Collection[],
  sortKey: SortKey
): Collection[] {
  const sorted = [...collections];
  switch (sortKey) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "most-complete":
      return sorted.sort(
        (a, b) => getCompletionPct(b) - getCompletionPct(a)
      );
    case "least-complete":
      return sorted.sort(
        (a, b) => getCompletionPct(a) - getCompletionPct(b)
      );
    default:
      return sorted;
  }
}

export function useCollectionSort(collections: Collection[]) {
  const [sortKey, setSortKey] = useState<SortKey>("newest");
  const sortedCollections = sortCollections(collections, sortKey);
  return { sortKey, setSortKey, sortedCollections };
}
