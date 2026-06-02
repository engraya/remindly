import { LayoutList } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/shared/EmptyState";
import { getUserCollectionsAction } from "@/features/collections/actions";
import { CreateCollectionButton } from "@/features/collections/components/CreateCollectionButton";
import { CollectionCard } from "@/features/collections/components/CollectionCard";
import type { Collection } from "@/features/collections/types";

type CollectionListProps = {
  collections?: Collection[];
  filterQuery?: string;
};

export async function CollectionList({
  collections: collectionsProp,
  filterQuery,
}: CollectionListProps = {}) {
  const collections = collectionsProp ?? (await getUserCollectionsAction());

  if (collections.length === 0) {
    return (
      <EmptyState
        icon={LayoutList}
        title="No collections yet"
        description="Create your first collection to start organizing tasks."
        action={<CreateCollectionButton />}
      />
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col items-center justify-center gap-4">
        <CreateCollectionButton />
        <Separator className="w-full max-w-lg" />
      </div>
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-4 lg:w-[500px]">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            filterQuery={filterQuery}
          />
        ))}
      </div>
    </div>
  );
}
