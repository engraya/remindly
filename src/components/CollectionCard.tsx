"use client"

import React, { useMemo, useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { CollectionColor, CollectionColors } from '@/lib/constants'
import { FaChevronUp, FaChevronDown } from "react-icons/fa6"
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { LuCalendarPlus } from "react-icons/lu"
import { FcFullTrash } from "react-icons/fc"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from './ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { deleteCollection } from '@/db/actions'
import { useToast } from '@/hooks/use-toast'
import { useTransition } from 'react'
import TaskCard from './TaskCard'
import CreateTaskDialog from './CreateTaskDialog'
import { LoaderCircle } from "lucide-react";

// Props and types
interface CollectionCardProps {
  collection: Collection
}

export type Task = {
  id: string;
  content: string;
  userId: string;
  done: boolean;
  expireAt: Date | null;
  createdAt: Date;
  collectionId: number;
};

export type Collection = {
  id: string;
  name: string;
  userId: string;
  color: string;
  createdAt: Date;
  tasks: Task[];
};

function CollectionCard({ collection }: CollectionCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, startTransition] = useTransition();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tasks = collection?.tasks;

  const router = useRouter();
  const { toast } = useToast();

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);
      toast({
        title: "Collection deleted successfully",
        description: "Your collection has been deleted successfully",
        duration: 5000,
        variant: "default",
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting collection:", error);
      toast({
        title: "Error deleting collection",
        description: "An error occurred while deleting your collection",
        duration: 5000,
        variant: "destructive",
      });
    }
  };

  const taskDone = useMemo(
    () => collection.tasks.filter((task) => task.done).length,
    [collection.tasks]
  );

  const totalTasks = collection.tasks.length;
  const progress = totalTasks === 0 ? 0 : (taskDone / totalTasks) * 100;

  return (
    <>
    <CreateTaskDialog
      open={showCreateModal}
      setOpen={setShowCreateModal}
      collection={collection}
    />
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
  <Button
    variant={"ghost"}
    className={cn(
      "w-full flex justify-between p-6",
      isOpen && "rounded-b-none",
      CollectionColors[collection.color as CollectionColor]
    )}
  >
    <span className="text-white font-bold">{collection.name}</span>
    {!isOpen ? <FaChevronDown className="w-4 h-4" /> : <FaChevronUp className="w-4 h-4" />}
  </Button>
</CollapsibleTrigger>

        <CollapsibleContent className="flex flex-col shadow-lg dark:bg-neutral-900 rounded-b-md">
          {tasks?.length === 0 ? (
            <Button
              variant={"ghost"}
              onClick={() => setShowCreateModal(true)}
              className="flex items-center justify-center gap-1 p-8 py-12 rounded-none"
            >
              <p className="text-sm text-gray-500">You don't have any tasks yet.</p>
              <span className={cn("text-sm bg-clip-text text-transparent", CollectionColors[collection.color as CollectionColor])}>Create one</span>
            </Button>
          ) : (
            <>
              <Progress className="w-full bg-emerald-500 rounded-none" value={progress} />
              <div className="p-4 gap-3 flex flex-col">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </>
          )}
          <Separator />
          <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center">
            <p>Created at {collection.createdAt.toDateString()}</p>
            {isLoading && <div className='flex gap-2'>Deleting....<LoaderCircle className="animate-spin  ml-2" /></div>}
            {!isLoading && (
              <div>
                <Button size={"icon"} variant={"ghost"} onClick={() => setShowCreateModal(true)}>
                  <LuCalendarPlus />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"ghost"} className="text-sm">
                      <FcFullTrash />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Collection</AlertDialogTitle>
                      <AlertDialogDescription>Are you sure you want to delete this collection?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel asChild>
                        <Button variant={"outline"} className="text-sm text-gray-900">
                          Cancel
                        </Button>
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button variant={"destructive"} onClick={() => startTransition(() => removeCollection())} className="text-sm">
                          Delete
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

export default CollectionCard;
