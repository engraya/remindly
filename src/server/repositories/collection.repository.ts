import { and, eq } from "drizzle-orm";
import { db } from "@/server/db/client";
import {
  collections,
  type Collection,
  type CollectionWithTasks,
} from "@/server/db/schema";

export const collectionRepository = {
  async findByUserId(userId: string): Promise<CollectionWithTasks[]> {
    return db.query.collections.findMany({
      where: eq(collections.userId, userId),
      with: {
        tasks: true,
      },
      orderBy: (collections, { desc }) => [desc(collections.createdAt)],
    });
  },

  async create(data: {
    name: string;
    color: string;
    userId: string;
  }): Promise<Collection> {
    const [created] = await db
      .insert(collections)
      .values({
        name: data.name,
        color: data.color,
        userId: data.userId,
      })
      .returning();

    return created;
  },

  async deleteByIdForUser(
    collectionId: number,
    userId: string
  ): Promise<boolean> {
    const deleted = await db
      .delete(collections)
      .where(
        and(eq(collections.id, collectionId), eq(collections.userId, userId))
      )
      .returning({ id: collections.id });

    return deleted.length > 0;
  },

  async findByIdForUser(
    collectionId: number,
    userId: string
  ): Promise<Collection | null> {
    const [row] = await db
      .select()
      .from(collections)
      .where(
        and(eq(collections.id, collectionId), eq(collections.userId, userId))
      )
      .limit(1);

    return row ?? null;
  },

  async update(data: {
    collectionId: number;
    userId: string;
    name: string;
    color: string;
  }): Promise<boolean> {
    const updated = await db
      .update(collections)
      .set({ name: data.name, color: data.color, updatedAt: new Date() })
      .where(
        and(eq(collections.id, data.collectionId), eq(collections.userId, data.userId))
      )
      .returning({ id: collections.id });

    return updated.length > 0;
  },
};
