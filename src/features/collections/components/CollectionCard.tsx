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
  Plus,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { Progress } from "@/components/ui/progress";
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

const EditCollectionDialog = dynamic(
  () =>
    import("@/features/collections/components/EditCollectionDialog").then(
      (m) => m.EditCollectionDialog
    ),
  { loading: () => <Loader className="py-4" />, ssr: false }
);

type CollectionCardProps = {
  collection: Collection;
  filterQuery?: string;
};

export function CollectionCard({
  collection,
  filterQuery,
}: CollectionCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDeleting, startDeleteTransition] = useTransition();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const tasks = filterQuery
    ? collection.tasks.filter((t) =>
        t.content.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : collection.tasks;

  const taskDone = tasks.filter((t) => t.done).length;
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

  const colorClasses = CollectionColors[collection.color as CollectionColor];

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
      {showEditModal && (
        <EditCollectionDialog
          open={showEditModal}
          onOpenChange={setShowEditModal}
          collection={collection}
        />
      )}

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          {/* ── Gradient header ── */}
          <CollapsibleTrigger
            className={cn(
              "flex w-full items-center justify-between px-5 py-4 text-left transition-opacity duration-150 hover:opacity-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50",
              colorClasses
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Collection initial */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <span className="text-sm font-bold text-white">
                  {collection.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold leading-tight text-white">
                  {collection.name}
                </p>
                <p className="text-xs text-white/65">
                  {totalTasks === 0
                    ? "No tasks yet"
                    : `${taskDone} of ${totalTasks} done`}
                </p>
              </div>
            </div>

            <div className="ml-3 flex shrink-0 items-center gap-2">
              {pendingTasks > 0 && (
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white">
                  {pendingTasks} left
                </span>
              )}
              {pendingTasks === 0 && totalTasks > 0 && (
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white">
                  All done ✓
                </span>
              )}
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-white/70" aria-hidden />
              ) : (
                <ChevronDown className="h-4 w-4 text-white/70" aria-hidden />
              )}
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="flex flex-col">
            {/* ── Progress bar ── */}
            {totalTasks > 0 && (
              <div className="flex items-center gap-3 border-b border-border/60 px-5 py-2.5">
                <Progress className="h-1.5 flex-1 rounded-full" value={progress} />
                <span className="w-9 shrink-0 text-right text-xs font-semibold tabular-nums text-muted-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
            )}

            {/* ── Task list or empty state ── */}
            {tasks.length === 0 ? (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex flex-col items-center gap-3 px-5 py-10 text-center transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:bg-muted/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Plus className="h-5 w-5 text-muted-foreground" aria-hidden />
                </div>
                <p className="text-sm text-muted-foreground">
                  No tasks yet.{" "}
                  <span
                    className={cn(
                      "font-medium bg-clip-text text-transparent",
                      colorClasses
                    )}
                  >
                    Add one →
                  </span>
                </p>
              </button>
            ) : (
              <div className="space-y-1.5 px-3 py-2">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}

            {/* ── Footer ── */}
            <div className="flex items-center justify-between border-t border-border bg-muted/20 px-4 py-2">
              {isDeleting ? (
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <LoaderCircle className="h-3.5 w-3.5 animate-spin" aria-hidden />
                  Deleting…
                </span>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {collection.createdAt
                    ? new Date(collection.createdAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )
                    : ""}
                </p>
              )}

              <div className="flex items-center">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowCreateModal(true)}
                  aria-label="Add task"
                  className="h-8 w-8 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <CalendarPlus className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowAiModal(true)}
                  aria-label="Add task with AI"
                  className="h-8 w-8 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowEditModal(true)}
                  aria-label="Edit collection"
                  className="h-8 w-8 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Delete collection"
                      className="h-8 w-8 text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <div className="flex flex-col items-center gap-4 px-6 pb-4 pt-6 text-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10">
                        <Trash2 className="h-5 w-5 text-destructive" aria-hidden />
                      </div>
                      <AlertDialogHeader className="space-y-1.5">
                        <AlertDialogTitle className="text-base">
                          Delete &ldquo;{collection.name}&rdquo;?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {totalTasks > 0
                            ? `This will permanently remove this collection and its ${totalTasks} task${totalTasks !== 1 ? "s" : ""}. This cannot be undone.`
                            : "This will permanently remove this collection. This cannot be undone."}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                    </div>
                    <AlertDialogFooter className="flex-row gap-2 border-t border-border bg-muted/20 px-6 py-4 sm:space-x-0">
                      <AlertDialogCancel className="mt-0 flex-1">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={removeCollection}
                        className="flex-1 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
}
