import { CheckCircle2, Clock, AlertCircle, ListTodo } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
  const completionPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: "Total",
      value: totalTasks,
      icon: ListTodo,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      secondary: null,
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10",
      secondary: `${completionPct}%`,
    },
    {
      label: "Pending",
      value: pendingTasks,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      secondary: null,
    },
    {
      label: "Overdue",
      value: overdueTasks,
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
      secondary: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, color, bg, secondary }) => (
        <Card key={label} className="shadow-sm transition-shadow duration-200 hover:shadow-md">
          <CardContent className="flex items-start gap-4 p-5">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                bg
              )}
            >
              <Icon className={cn("h-5 w-5", color)} aria-hidden />
            </div>
            <div>
              <p className="text-2xl font-bold leading-none">{value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{label}</p>
              {secondary && (
                <p className="mt-0.5 text-xs font-semibold text-primary">
                  {secondary}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
