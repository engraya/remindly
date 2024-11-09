import React from 'react';
import CreateCollectionButton from '@/components/CreateCollectionButton'; // Import your button component
import { getUserCollections } from '@/db/actions';
import CollectionCard from '@/components/CollectionCard';
import { Separator } from './ui/separator';


type CollectionListProps = {
    user?: any;
};

async function CollectionList({ user }: CollectionListProps) {
    const userId = user?.id;
    const collections = await getUserCollections(userId);

    console.log("collections", collections);

    return (
        <div className="collection-list">
            {collections.length === 0 ? (
                <div className="empty-state flex flex-col items-center justify-center">
                    <p className="text-lg text-gray-500">You don't have any collections yet.</p>
                    <CreateCollectionButton />
                </div>
            ) : (
                <div className="w-full">
                    <>
                    <div className="flex flex-col gap-4 justify-center mx-auto w-full items-center">
                    <CreateCollectionButton />
                    <Separator />
                    </div>
                        <div className="w-full lg:w-[500px] max-w-[1500px] flex flex-col gap-4 mt-6">
                        {collections?.map((collection: any) => (
                            <>
                            <CollectionCard key={collection.id} collection={collection} />
                            </>
                        ))}
                        </div>
                    </>
     
                </div>
            )}
        </div>
    );
}

export default CollectionList;
