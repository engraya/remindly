import { currentUser } from "@clerk/nextjs/server";
import { AppError } from "@/server/errors";
import type { AuthUser } from "@/types/auth";

export type { AuthUser };

export async function requireUser(): Promise<AuthUser> {
  const user = await currentUser();

  if (!user) {
    throw new AppError("UNAUTHORIZED", "You must be signed in");
  }

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
  };
}
