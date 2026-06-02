import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { requireUser } from "@/server/auth/require-user";
import { getUserCollectionsAction } from "@/features/collections/actions";
import { WelcomeMessage } from "@/components/layout/WelcomeMessage";
import { DashboardStats } from "@/features/collections/components/DashboardStats";
import { DashboardClient } from "@/app/(app)/dashboard/_components/DashboardClient";
import { UpgradeBanner } from "@/features/billing/components/UpgradeBanner";

export const metadata: Metadata = {
  title: "Dashboard — Remindly",
  description: "Manage your task collections",
};

export default async function DashboardPage() {
  const user = await requireUser();
  const collections = await getUserCollectionsAction();

  return (
    <div className="min-h-[calc(100vh-57px)] bg-muted/30">
      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome header */}
        <WelcomeMessage user={user} />

        {/* Stats row — hidden when no tasks exist */}
        <DashboardStats collections={collections} />

        {/* Upgrade banner */}
        <UpgradeBanner />

        {/* Collections */}
        <DashboardClient collections={collections} />
      </div>
    </div>
  );
}
