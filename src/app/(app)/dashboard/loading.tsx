import { Loader } from "@/components/shared/Loader";

export default function DashboardLoading() {
  return (
    <main className="flex min-h-[50vh] items-center justify-center bg-background">
      <Loader label="Loading dashboard..." />
    </main>
  );
}
