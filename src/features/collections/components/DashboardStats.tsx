import { CheckCircle2, Clock, AlertCircle, ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Collection } from "@/features/collections/types";

type DashboardStatsProps = {
  collections: Collection[];
};

export function DashboardStats({ collections }: DashboardStatsProps) {
  const allTasks = collections.flatMap((c) => c.tasks);
  const totalTasks = allTasks.length;

  if (totalTasks === 0) return null;

  const completedTasks = allTasks.filter((t) => t.done).length;
  const pendingTasks = totalTasks - completedTasks;
  const now = new Date();
  const overdueTasks = allTasks.filter(
    (t) => !t.done && t.expireAt && new Date(t.expireAt) < now
  ).length;
  const completionPct =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: "Total tasks",
      value: totalTasks,
      icon: ListTodo,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      ring: "ring-blue-100 dark:ring-blue-500/20",
      bar: "bg-blue-500",
      secondary: null,
      accentBorder: "border-t-blue-500/40",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      ring: "ring-emerald-100 dark:ring-emerald-500/20",
      bar: "bg-emerald-500",
      secondary: `${completionPct}%`,
      accentBorder: "border-t-emerald-500/40",
    },
    {
      label: "Pending",
      value: pendingTasks,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      ring: "ring-amber-100 dark:ring-amber-500/20",
      bar: "bg-amber-500",
      secondary: null,
      accentBorder: "border-t-amber-500/40",
    },
    {
      label: "Overdue",
      value: overdueTasks,
      icon: AlertCircle,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-500/10",
      ring: "ring-red-100 dark:ring-red-500/20",
      bar: "bg-red-500",
      secondary: null,
      accentBorder: "border-t-red-500/40",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map(
        ({ label, value, icon: Icon, color, bg, ring, secondary, accentBorder }) => (
          <div
            key={label}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
              "border-t-2",
              accentBorder
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold leading-none text-foreground">
                  {value}
                </p>
                <p className="mt-1.5 text-xs font-medium text-muted-foreground">
                  {label}
                </p>
                {secondary && (
                  <p className="mt-1 text-xs font-semibold text-primary">
                    {secondary} done
                  </p>
                )}
              </div>
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1",
                  bg,
                  ring
                )}
              >
                <Icon className={cn("h-5 w-5", color)} aria-hidden />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
