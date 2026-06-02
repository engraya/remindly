import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UpgradeBanner() {
  return (
    <aside
      className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-6 shadow-sm"
      aria-label="Upgrade to Pro"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/20">
            <Zap className="h-5 w-5 text-primary" aria-hidden />
          </div>
          <div>
            <p className="font-semibold text-foreground">Unlock Remindly Pro</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Unlimited collections, priority AI parsing, and advanced analytics.
            </p>
          </div>
        </div>
        <Button asChild size="sm" className="shrink-0 gap-1.5 shadow-sm shadow-primary/20">
          <Link href="/about">
            <Zap className="h-3.5 w-3.5" aria-hidden />
            Upgrade now
          </Link>
        </Button>
      </div>
    </aside>
  );
}
