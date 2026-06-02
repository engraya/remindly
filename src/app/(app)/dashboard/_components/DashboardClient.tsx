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
      <div className="py-12">
        <EmptyState
          icon={LayoutList}
          title="No collections yet"
          description="Create your first collection to start organizing tasks."
          action={<CreateCollectionButton />}
        />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-2">
        <TaskSearch query={filterQuery} onQueryChange={setFilterQuery} />
        <CollectionSortSelect value={sortKey} onValueChange={setSortKey} />
        <CreateCollectionButton />
      </div>

      {visibleCollections.length === 0 ? (
        <EmptyState
          title="No results"
          description={`No tasks or collections match "${filterQuery}"`}
        />
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
