import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type LoaderProps = {
  label?: string;
  className?: string;
};

export function Loader({ label = "Loading...", className }: LoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 text-muted-foreground",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle className="h-6 w-6 animate-spin" aria-hidden />
      <span>{label}</span>
    </div>
  );
}
