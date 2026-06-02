import type { Metadata } from "next";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  LayoutList,
  Zap,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Remindly — Stay on top of your tasks",
  description:
    "Never miss a deadline again. Organize, prioritize, and conquer your to-dos with ease.",
};

const features = [
  {
    icon: LayoutList,
    title: "Smart Collections",
    description:
      "Group tasks into themed collections with beautiful colors. Separate work, life, and goals with clarity.",
  },
  {
    icon: CheckCircle2,
    title: "Visual Progress",
    description:
      "Progress bars show exactly how close you are to completing every collection at a glance.",
  },
  {
    icon: Sparkles,
    title: "AI Task Creation",
    description:
      'Say "Call dentist Thursday" and AI parses the deadline automatically — no manual date picking.',
  },
];

const steps = [
  {
    number: "01",
    title: "Create a Collection",
    description:
      'Group related tasks — "Work Sprint", "Home", "Health" — each with a distinctive color.',
  },
  {
    number: "02",
    title: "Add Your Tasks",
    description:
      "Type tasks manually or describe them in plain language and let AI handle the rest.",
  },
  {
    number: "03",
    title: "Track & Complete",
    description:
      "Watch progress bars fill as you check things off. Always know what needs your attention.",
  },
];

const metrics = [
  { value: "Free", label: "To get started" },
  { value: "< 3s", label: "AI task parsing" },
  { value: "Unlimited", label: "Tasks & collections" },
];

export default function Home() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        {/* Subtle dot-grid background */}
        <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_90%_70%_at_50%_0%,#000_20%,transparent_100%)]" />

        {/* Ambient gradient blobs */}
        <div className="pointer-events-none absolute -top-48 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute top-32 right-0 h-80 w-80 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="pointer-events-none absolute top-32 left-0 h-64 w-64 rounded-full bg-indigo-400/5 blur-3xl" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center lg:px-8">
          {/* Pill badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            AI-powered task management
          </div>

          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            The smarter way to
            <br className="hidden sm:block" />
            <span className="mt-1 block bg-gradient-to-r from-primary via-violet-500 to-indigo-400 bg-clip-text text-transparent">
              manage your work
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Stay organized, meet every deadline, and accomplish more. Remindly
            brings AI parsing, visual progress tracking, and smart collections
            into one elegant workspace.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SignedIn>
              <Button
                asChild
                size="lg"
                className="h-12 gap-2 px-8 text-base shadow-lg shadow-primary/20"
              >
                <Link href="/dashboard">
                  Open Dashboard
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="h-12 gap-2 px-8 text-base shadow-lg shadow-primary/20"
                >
                  Get started for free
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </SignInButton>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base"
              >
                <Link href="/about">Learn more</Link>
              </Button>
            </SignedOut>
          </div>

          <p className="mt-6 text-sm text-muted-foreground/70">
            No credit card required · Free forever on the base plan
          </p>

          {/* Metric row */}
          <div className="mt-16 flex items-center gap-10 sm:gap-16">
            {metrics.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-foreground">{value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────────── */}
      <section className="border-y border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Features
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to stay organized
            </h2>
            <p className="mt-4 text-muted-foreground">
              Designed for people who care about getting things done.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15 transition-colors duration-200 group-hover:bg-primary/15">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
                {/* Bottom accent line on hover */}
                <div className="absolute inset-x-0 bottom-0 h-px rounded-b-2xl bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─────────────────────────────────────────── */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Up and running in minutes
            </h2>
            <p className="mt-4 text-muted-foreground">
              No complex setup. Three steps to a calmer, more organized mind.
            </p>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {steps.map(({ number, title, description }, i) => (
              <div
                key={number}
                className="relative flex flex-col items-center gap-5 text-center"
              >
                {/* Dashed connector between steps */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+2.5rem)] top-5 hidden h-px w-[calc(100%-3rem)] border-t border-dashed border-border sm:block" />
                )}

                <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md shadow-primary/25">
                  {number}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border py-24">
        {/* Gradient background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-violet-500/5" />
        <div className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-violet-500/8 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="h-3.5 w-3.5" aria-hidden />
            Start for free today
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to take control of your time?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join thousands of productive people who use Remindly to ship more
            and stress less — every single day.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="h-12 gap-2 px-8 text-base shadow-lg shadow-primary/20"
                >
                  Start for free
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </SignInButton>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base"
              >
                <Link href="/about">Learn more</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button
                asChild
                size="lg"
                className="h-12 gap-2 px-8 text-base shadow-lg shadow-primary/20"
              >
                <Link href="/dashboard">
                  Open Dashboard
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </SignedIn>
          </div>
        </div>
      </section>
    </>
  );
}
