"use client";

import { useTransition } from "react";
import { format } from "date-fns";
import { Calendar, LoaderCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Task } from "@/features/collections/types";
import { setTaskToDoneAction } from "@/features/tasks/actions";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";

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
    </div>
  );
}
