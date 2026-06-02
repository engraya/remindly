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
    <section className="mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-6 lg:p-8">
      <WelcomeMessage user={user} />
      <DashboardStats collections={collections} />
      <UpgradeBanner />
      <DashboardClient collections={collections} />
    </section>
  );
}
