import Image from "next/image";
import { FcOvertime, FcTimeline } from "react-icons/fc";
import type { AuthUser } from "@/types/auth";

type UserProfileProps = {
  user: AuthUser;
};

export function UserProfile({ user }: UserProfileProps) {
  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "User";

  return (
    <div className="relative flex w-full max-w-md items-center gap-4 rounded border border-border p-4 shadow-sm">
      <div className="absolute -left-2 -top-2 flex gap-1 rounded bg-background text-xl">
        <FcOvertime className="text-red-500" aria-hidden />
        <FcTimeline aria-hidden />
      </div>
      <Image
        className="h-20 w-20 rounded-full object-cover"
        width={80}
        height={80}
        src={user.imageUrl}
        alt={`${displayName} profile`}
      />
      <h1 className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-xl font-bold text-transparent">
        {displayName}
      </h1>
    </div>
  );
}
