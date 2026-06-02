"use client";

import { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import {
  ChevronUp,
  ChevronDown,
  CalendarPlus,
  Trash2,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { deleteCollectionAction } from "@/features/collections/actions";
import { getErrorMessage } from "@/lib/errors";
import type { Collection } from "@/features/collections/types";
import { TaskCard } from "@/features/tasks/components/TaskCard";
import { Loader } from "@/components/shared/Loader";

const CreateTaskDialog = dynamic(
  () =>
    import("@/features/tasks/components/CreateTaskDialog").then(
      (m) => m.CreateTaskDialog
    ),
  { loading: () => <Loader className="py-4" />, ssr: false }
);

const NaturalLanguageTaskDialog = dynamic(
  () =>
    import("@/features/tasks/components/NaturalLanguageTaskDialog").then(
      (m) => m.NaturalLanguageTaskDialog
    ),
  { loading: () => <Loader className="py-4" />, ssr: false }
);

type CollectionCardProps = {
  collection: Collection;
  filterQuery?: string;
};

export function CollectionCard({ collection, filterQuery }: CollectionCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDeleting, startDeleteTransition] = useTransition();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  const tasks = filterQuery
    ? collection.tasks.filter((t) =>
        t.content.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : collection.tasks;
  const taskDone = tasks.filter((task) => task.done).length;
  const pendingTasks = tasks.filter((t) => !t.done).length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : (taskDone / totalTasks) * 100;

  const removeCollection = () => {
    startDeleteTransition(async () => {
      try {
        await deleteCollectionAction(collection.id);
        toast.success("Collection deleted", {
          description: "Your collection has been removed.",
        });
      } catch (error) {
        toast.error("Error deleting collection", {
          description: getErrorMessage(error),
        });
      }
    });
  };

  return (
    <>
      {showCreateModal && (
        <CreateTaskDialog
          open={showCreateModal}
          setOpen={setShowCreateModal}
          collection={collection}
        />
      )}
      {showAiModal && (
        <NaturalLanguageTaskDialog
          open={showAiModal}
          onOpenChange={setShowAiModal}
          collection={collection}
        />
      )}

      <div className="overflow-hidden rounded-xl border border-border shadow-sm transition-shadow duration-200 hover:shadow-md">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex w-full justify-between rounded-none px-5 py-4 transition-opacity duration-150 hover:opacity-90",
                CollectionColors[collection.color as CollectionColor]
              )}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{collection.name}</span>
                {pendingTasks > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white hover:bg-white/30"
                  >
                    {pendingTasks}
                  </Badge>
                )}
                {pendingTasks === 0 && totalTasks > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white hover:bg-white/30"
                  >
                    All done ✓
                  </Badge>
                )}
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-white" aria-hidden />
              ) : (
                <ChevronDown className="h-4 w-4 text-white" aria-hidden />
              )}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="flex flex-col">
            {tasks.length === 0 ? (
              <Button
                variant="ghost"
                onClick={() => setShowCreateModal(true)}
                className="flex items-center justify-center gap-1 rounded-none p-8 py-12"
              >
                <p className="text-sm text-muted-foreground">
                  You don&apos;t have any tasks yet.
                </p>
                <span
                  className={cn(
                    "text-sm bg-clip-text text-transparent",
                    CollectionColors[collection.color as CollectionColor]
                  )}
                >
                  Create one
                </span>
              </Button>
            ) : (
              <>
                <Progress className="w-full rounded-none" value={progress} />
                <div className="flex flex-col gap-3 p-4">
                  {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </>
            )}

            <Separator />

            <footer className="flex h-12 items-center justify-between px-4 py-2 text-xs text-muted-foreground">
              <p>
                Created{" "}
                {collection.createdAt
                  ? new Date(collection.createdAt).toDateString()
                  : ""}
              </p>
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  Deleting...
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                </span>
              ) : (
                <div className="flex items-center">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowCreateModal(true)}
                    aria-label="Add task"
                    className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
                  >
                    <CalendarPlus className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowAiModal(true)}
                    aria-label="Add task with AI"
                    className="text-muted-foreground transition-colors duration-150 hover:text-primary"
                  >
                    <Sparkles className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Delete collection"
                        className="text-muted-foreground transition-colors duration-150 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete collection</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure? This will delete all tasks in this
                          collection.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={removeCollection}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </footer>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
}
