import { and, eq } from "drizzle-orm";
import { db } from "@/server/db/client";
import { tasks, type Task } from "@/server/db/schema";

export const taskRepository = {
  async create(data: {
    content: string;
    userId: string;
    collectionId: number;
    expireAt?: Date | null;
  }): Promise<Task> {
    const [created] = await db
      .insert(tasks)
      .values({
        content: data.content,
        userId: data.userId,
        collectionId: data.collectionId,
        expireAt: data.expireAt ?? null,
      })
      .returning();

    return created;
  },

  async markDone(taskId: number, userId: string): Promise<boolean> {
    const updated = await db
      .update(tasks)
      .set({ done: true, updatedAt: new Date() })
      .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
      .returning({ id: tasks.id });

    return updated.length > 0;
  },
};
