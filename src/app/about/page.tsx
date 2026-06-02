import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Zap, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About — Remindly",
  description:
    "Learn about Remindly's mission to simplify task management for everyone.",
};

const values = [
  {
    icon: Target,
    title: "Focus on what matters",
    description:
      "We strip away the noise so you can see exactly what needs to get done — nothing more, nothing less.",
  },
  {
    icon: Zap,
    title: "Speed & simplicity",
    description:
      "Adding a task should take seconds, not minutes. We've obsessed over every interaction to keep things fast.",
  },
  {
    icon: Shield,
    title: "Reliable by design",
    description:
      "Your tasks are important. We build with reliability first, so your data is always there when you need it.",
  },
  {
    icon: Heart,
    title: "Made with care",
    description:
      "Every detail — from color choices to micro-animations — is crafted to make your daily experience a little nicer.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border py-24">
        <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_20%,transparent_100%)]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            About Remindly
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Built for people who
            <span className="mt-1 block bg-gradient-to-r from-primary via-violet-500 to-indigo-400 bg-clip-text text-transparent">
              care about their time
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            At Remindly, we believe that productivity tools should work for you,
            not the other way around. We built a task manager that respects your
            time and gets out of your way.
          </p>
        </div>
      </section>

      {/* ─── Mission ──────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 sm:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                Our mission
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Simplify your daily life
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                We designed Remindly to help you manage tasks with zero stress.
                Whether you&apos;re juggling work projects, tracking personal
                goals, or organizing daily errands, Remindly keeps you focused
                and productive.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Our intuitive interface and smart AI reminders ensure you
                never forget a task again — so you can achieve more with far
                less effort.
              </p>
            </div>

            {/* Visual accent card */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
              <div className="relative space-y-4">
                {[
                  { pct: 92, label: "Tasks completed on time" },
                  { pct: 78, label: "Less context switching" },
                  { pct: 3, label: "Seconds to add a task" },
                ].map(({ pct, label }) => (
                  <div key={label}>
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {label}
                      </p>
                      <p className="text-xl font-bold text-primary">
                        {pct}
                        {pct < 10 ? "s" : "%"}
                      </p>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-violet-500"
                        style={{
                          width: pct < 10 ? "20%" : `${pct}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ───────────────────────────────────────────────── */}
      <section className="border-y border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Our values
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What we stand for
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group flex items-start gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15 transition-colors duration-200 group-hover:bg-primary/15">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to get organized?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Start for free and see why thousands of people trust Remindly to
            keep their work on track.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="h-12 gap-2 px-8 text-base shadow-lg shadow-primary/20">
              <Link href="/">
                Get started
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
