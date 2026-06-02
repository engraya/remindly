"use client";

import { UserProfile } from "@/components/layout/UserProfile";
import type { AuthUser } from "@/types/auth";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

type WelcomeMessageProps = {
  user: AuthUser;
};

export function WelcomeMessage({ user }: WelcomeMessageProps) {
  const greeting = getGreeting();
  const firstName = user.firstName ?? "there";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {getFormattedDate()}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">
          {greeting}, {firstName} 👋
        </h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Here&apos;s an overview of your tasks today.
        </p>
      </div>
      <UserProfile user={user} />
    </div>
  );
}
