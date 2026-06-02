"use client";

import { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { format } from "date-fns";
import { Calendar, LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import type { Task } from "@/features/collections/types";
import { setTaskToDoneAction, deleteTaskAction } from "@/features/tasks/actions";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import { Loader } from "@/components/shared/Loader";

const EditTaskDialog = dynamic(
  () =>
    import("@/features/tasks/components/EditTaskDialog").then(
      (m) => m.EditTaskDialog
    ),
  { loading: () => <Loader className="py-4" />, ssr: false }
);

function getUrgency(expireAt: Date | string) {
  const days = Math.floor(
    (new Date(expireAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  if (days < 0)
    return {
      accent: "bg-red-500",
      chip: "bg-red-500/10 dark:bg-red-500/20",
      text: "text-red-600 dark:text-red-400",
    };
  if (days <= 7)
    return {
      accent: "bg-amber-400",
      chip: "bg-amber-500/10 dark:bg-amber-500/20",
      text: "text-amber-600 dark:text-amber-400",
    };
  return {
    accent: "bg-emerald-400",
    chip: "bg-emerald-500/10 dark:bg-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
  };
}

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const [isLoading, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleComplete = () => {
    startTransition(async () => {
      try {
        await setTaskToDoneAction(task.id);
        toast.success("Task completed", {
          description: "Nice work — task marked as done.",
        });
      } catch (error) {
        toast.error("Could not complete task", {
          description: getErrorMessage(error),
        });
      }
    });
  };

  const urgency = task.expireAt ? getUrgency(task.expireAt) : null;
  const accentBar = task.done
    ? "bg-border"
    : urgency
      ? urgency.accent
      : "bg-primary/40";

  return (
    <>
      {showEditModal && (
        <EditTaskDialog
          task={task}
          open={showEditModal}
          onOpenChange={setShowEditModal}
        />
      )}

      <div
        className={cn(
          "group relative flex items-center gap-3 overflow-hidden rounded-xl",
          "border border-border/60 bg-card px-4 py-3",
          "transition-all duration-200",
          !task.done &&
            "hover:border-border hover:shadow-sm hover:shadow-black/5 dark:hover:shadow-black/20",
          task.done && "opacity-50"
        )}
      >
        {/* Urgency accent strip */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-[3px] rounded-r-full transition-colors duration-300",
            accentBar
          )}
          aria-hidden
        />

        {/* Checkbox / loader */}
        {isLoading ? (
          <LoaderCircle
            className="h-4 w-4 shrink-0 animate-spin text-muted-foreground"
            aria-hidden
          />
        ) : (
          <Checkbox
            id={`task-${task.id}`}
            className="h-4 w-4 shrink-0"
            checked={task.done}
            disabled={task.done}
            onCheckedChange={() => {
              if (!task.done) handleComplete();
            }}
            aria-label={`Mark "${task.content}" as done`}
          />
        )}

        {/* Content */}
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            "min-w-0 flex-1 select-none",
            task.done ? "pointer-events-none" : "cursor-pointer"
          )}
        >
          <span
            className={cn(
              "block text-sm font-medium leading-snug",
              task.done
                ? "text-muted-foreground line-through"
                : "text-foreground"
            )}
          >
            {task.content}
          </span>
        </label>

        {/* Date chip */}
        {task.expireAt && !task.done && urgency && (
          <div
            className={cn(
              "flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5",
              urgency.chip
            )}
          >
            <Calendar className={cn("h-3 w-3", urgency.text)} aria-hidden />
            <span className={cn("text-xs font-medium tabular-nums", urgency.text)}>
              {format(new Date(task.expireAt), "MMM d")}
            </span>
          </div>
        )}

        {/* Edit + delete buttons — visible on hover, only for pending tasks */}
        {!task.done && (
          <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowEditModal(true)}
              aria-label="Edit task"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Delete task"
                  disabled={isDeleting}
                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                >
                  {isDeleting ? (
                    <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col items-center gap-4 px-6 pb-4 pt-6 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10">
                    <Trash2 className="h-5 w-5 text-destructive" aria-hidden />
                  </div>
                  <AlertDialogHeader className="space-y-1.5">
                    <AlertDialogTitle className="text-base">
                      Delete this task?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      &ldquo;{task.content}&rdquo; will be permanently removed. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter className="flex-row gap-2 border-t border-border bg-muted/20 px-6 py-4 sm:space-x-0">
                  <AlertDialogCancel className="mt-0 flex-1">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="flex-1 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
                    onClick={() =>
                      startDeleteTransition(async () => {
                        try {
                          await deleteTaskAction(task.id);
                          toast.success("Task deleted", {
                            description: "The task has been removed.",
                          });
                        } catch (error) {
                          toast.error("Could not delete task", {
                            description: getErrorMessage(error),
                          });
                        }
                      })
                    }
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </>
  );
}
