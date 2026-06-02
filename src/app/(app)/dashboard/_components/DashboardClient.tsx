"use client";

import { useState } from "react";
import { LayoutList } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { CollectionCard } from "@/features/collections/components/CollectionCard";
import { CollectionSortSelect } from "@/features/collections/components/CollectionSortSelect";
import { CreateCollectionButton } from "@/features/collections/components/CreateCollectionButton";
import { TaskSearch } from "@/features/tasks/components/TaskSearch";
import { useCollectionSort } from "@/features/collections/hooks/use-collection-sort";
import type { Collection } from "@/features/collections/types";

type DashboardClientProps = {
  collections: Collection[];
};

export function DashboardClient({ collections }: DashboardClientProps) {
  const [filterQuery, setFilterQuery] = useState("");
  const { sortKey, setSortKey, sortedCollections } =
    useCollectionSort(collections);

  const visibleCollections = filterQuery
    ? sortedCollections.filter(
        (c) =>
          c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
          c.tasks.some((t) =>
            t.content.toLowerCase().includes(filterQuery.toLowerCase())
          )
      )
    : sortedCollections;

  if (collections.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card py-4 shadow-sm">
        <EmptyState
          icon={LayoutList}
          title="No collections yet"
          description="Create your first collection to start organizing your tasks."
          action={<CreateCollectionButton />}
        />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <h2 className="text-sm font-semibold text-foreground">
            Collections
          </h2>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
            {collections.length}
          </span>
        </div>
        <CreateCollectionButton />
      </div>

      {/* Filter toolbar */}
      <div className="flex items-center rounded-xl border border-border bg-card shadow-sm">
        <TaskSearch query={filterQuery} onQueryChange={setFilterQuery} />
        <div className="h-5 w-px shrink-0 bg-border" />
        <CollectionSortSelect value={sortKey} onValueChange={setSortKey} />
      </div>

      {/* Collection grid */}
      {visibleCollections.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card">
          <EmptyState
            title="No results"
            description={`No tasks or collections match "${filterQuery}"`}
          />
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          {visibleCollections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              filterQuery={filterQuery || undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
