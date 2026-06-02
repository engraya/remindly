import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Remindly",
  description:
    "Learn about Remindly's mission to simplify task management for everyone.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="mb-6 text-center text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
            About Remindly
          </span>
        </h1>
        <p className="text-center text-xl font-medium leading-relaxed text-foreground">
          At Remindly, we believe in simplifying your daily life. We designed
          Remindly to help you manage your tasks with zero stress. Whether
          you&apos;re juggling work projects, keeping track of personal goals,
          or organizing daily errands, Remindly keeps you focused and
          productive.
        </p>
        <p className="mt-6 text-center text-lg leading-relaxed text-muted-foreground">
          Our intuitive interface and smart reminders ensure that you&apos;ll
          never forget a task, so you can achieve more with less effort. Join us
          on a journey to better productivity and a more organized life.
        </p>
      </section>
    </main>
  );
}
