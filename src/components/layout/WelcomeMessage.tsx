"use client";

import { UserProfile } from "@/components/layout/UserProfile";
import type { AuthUser } from "@/types/auth";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

type WelcomeMessageProps = {
  user: AuthUser;
};

export function WelcomeMessage({ user }: WelcomeMessageProps) {
  return (
    <div className="flex flex-col gap-4 pb-6 md:flex-row md:items-center md:justify-between">
      <UserProfile user={user} />
      <div className="flex flex-col gap-1 md:text-right">
        <p className="text-lg font-semibold text-foreground">
          {getGreeting()}, {user.firstName ?? "there"} 👋
        </p>
        <p className="text-sm text-muted-foreground">
          Here&apos;s an overview of your tasks today.
        </p>
      </div>
    </div>
  );
}
