import Image from "next/image";
import type { AuthUser } from "@/types/auth";

type UserProfileProps = {
  user: AuthUser;
};

export function UserProfile({ user }: UserProfileProps) {
  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "User";

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
      <div className="relative">
        <Image
          className="h-9 w-9 rounded-full object-cover ring-2 ring-border"
          width={36}
          height={36}
          src={user.imageUrl}
          alt={`${displayName} profile`}
        />
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
      </div>
      <div className="hidden sm:block">
        <p className="text-sm font-semibold leading-tight text-foreground">
          {displayName}
        </p>
        <p className="text-xs text-muted-foreground">Active</p>
      </div>
    </div>
  );
}
