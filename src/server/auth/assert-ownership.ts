import { and, eq } from "drizzle-orm";
import { db } from "@/server/db/client";
import { collections, tasks } from "@/server/db/schema";
import { AppError } from "@/server/errors";

export async function assertCollectionOwner(
  userId: string,
  collectionId: number
): Promise<void> {
  const [row] = await db
    .select({ id: collections.id })
    .from(collections)
    .where(
      and(eq(collections.id, collectionId), eq(collections.userId, userId))
    )
    .limit(1);

  if (!row) {
    throw new AppError(
      "FORBIDDEN",
      "You do not have access to this collection"
    );
  }
}

export async function assertTaskOwner(
  userId: string,
  taskId: number
): Promise<void> {
  const [row] = await db
    .select({ id: tasks.id })
    .from(tasks)
    .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
    .limit(1);

  if (!row) {
    throw new AppError("FORBIDDEN", "You do not have access to this task");
  }
}
