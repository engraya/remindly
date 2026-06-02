"use client";

import { useTransition } from "react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Task } from "@/features/collections/types";
import { setTaskToDoneAction } from "@/features/tasks/actions";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import { LoaderCircle } from "lucide-react";

function getExpirationColor(expiresAt: Date) {
  const days = Math.floor(
    (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  if (days < 0) return "text-red-500";
  if (days <= 7) return "text-amber-500";
  return "text-green-500";
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

  return (
    <div
      className={cn(
        "group flex items-start gap-3 rounded-lg border p-4 transition-all duration-150",
        "hover:bg-accent/40 hover:border-accent",
        task.done && "bg-muted/30 opacity-60"
      )}
    >
      <Checkbox
        id={`task-${task.id}`}
        className="mt-0.5 h-4 w-4 shrink-0 transition-all"
        checked={task.done}
        disabled={task.done || isLoading}
        onCheckedChange={() => {
          if (!task.done) handleComplete();
        }}
        aria-label={`Mark task ${task.content} as done`}
      />
      {isLoading && (
        <LoaderCircle
          className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-muted-foreground"
          aria-hidden
        />
      )}
      <label
        htmlFor={`task-${task.id}`}
        className={cn(
          "flex-1 cursor-pointer text-sm font-medium leading-snug",
          task.done && "line-through text-muted-foreground"
        )}
      >
        {task.content}
        {task.expireAt && (
          <p
            className={cn(
              "mt-1.5 text-xs font-medium",
              getExpirationColor(new Date(task.expireAt))
            )}
          >
            Expires {format(new Date(task.expireAt), "dd/MM/yy")}
          </p>
        )}
      </label>
    </div>
  );
}
