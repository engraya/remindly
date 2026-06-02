import type { Metadata } from "next";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles, LayoutList } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Remindly — Stay on top of your tasks",
  description:
    "Never miss a deadline again. Organize, prioritize, and conquer your to-dos with ease.",
};

const features = [
  {
    icon: LayoutList,
    title: "Collections",
    description:
      "Group your tasks into themed collections with beautiful gradient colors.",
  },
  {
    icon: CheckCircle,
    title: "Track Progress",
    description:
      "Visual progress bars show how close you are to completing each collection.",
  },
  {
    icon: Sparkles,
    title: "AI Task Creation",
    description:
      'Describe your task naturally — "Remind me to call dentist Thursday" — and we handle the rest.',
  },
];

const steps = [
  {
    number: "1",
    title: "Create a Collection",
    description:
      'Group related tasks — "Work sprint", "Home", "Health" — each with a unique gradient color.',
  },
  {
    number: "2",
    title: "Add Tasks",
    description:
      "Type tasks manually or describe them naturally and let AI parse the deadline for you.",
  },
  {
    number: "3",
    title: "Track & Complete",
    description:
      "Watch progress bars fill as you check off tasks. Never lose track of what matters.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1a1a1f] gradient-mesh">
        <svg
          className="absolute -top-6 animate-pulse opacity-70 blur-3xl"
          width="100%"
          height="100%"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <g clipPath="url(#clip0_17_56)">
            <g filter="url(#filter0_f_17_56)">
              <path d="M128.6 0H0V322.2L250.5 231.5L128.6 0Z" fill="white" />
              <path
                d="M0 322.2V400H240H320L250.5 231.5L0 322.2Z"
                fill="#5701c9"
              />
              <path
                d="M320 400H400V78.75L250.5 231.5L320 400Z"
                fill="#5209ee"
              />
              <path
                d="M400 0H128.6L250.5 231.5L400 78.75V0Z"
                fill="#380094"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_f_17_56"
              x="-160.333"
              y="-160.333"
              width="720.666"
              height="720.666"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="80.1666"
                result="effect1_foregroundBlur_17_56"
              />
            </filter>
          </defs>
        </svg>

        <div className="relative mx-auto flex min-h-svh max-w-7xl flex-col items-center justify-center px-8 py-6 lg:px-16">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-200 sm:text-5xl md:text-6xl">
              <span className="block">Stay on top of your tasks</span>
              <span className="mt-2 block bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                effortlessly
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-gray-400">
              Never miss a deadline again. Organize, prioritize, and conquer
              your to-dos — whether it&apos;s work, personal tasks, or
              long-term goals.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SignedIn>
                <Button asChild size="lg" className="gap-2">
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button size="lg" className="gap-2">
                    Get started for free
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                </SignInButton>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/about">Learn more</Link>
                </Button>
              </SignedOut>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            Features
          </p>
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground">
            Everything you need to stay organized
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group flex flex-col items-start gap-3 rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:border-primary/20 hover:shadow-md"
              >
                <div className="rounded-lg bg-primary/10 p-2 transition-colors duration-200 group-hover:bg-primary/20">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-primary">
            How it works
          </p>
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tight text-foreground">
            Three steps to a calmer mind
          </h2>
          <div className="grid gap-10 sm:grid-cols-3">
            {steps.map(({ number, title, description }) => (
              <div
                key={number}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary ring-1 ring-primary/20">
                  {number}
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Ready to take control of your time?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join developers and teams who use Remindly to ship more and stress
            less.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="gap-2">
                  Start for free
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button asChild size="lg" className="gap-2">
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
