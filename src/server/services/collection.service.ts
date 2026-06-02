import { revalidatePath } from "next/cache";
import { AppError } from "@/server/errors";
import { requireUser } from "@/server/auth/require-user";
import { assertMutationRateLimit } from "@/server/rate-limit";
import { collectionRepository } from "@/server/repositories/collection.repository";
import {
  createCollectionSchema,
  type CreateCollectionInput,
} from "@/features/collections/schemas/create-collection.schema";
import {
  updateCollectionSchema,
  type UpdateCollectionInput,
} from "@/features/collections/schemas/update-collection.schema";
import type { CollectionWithTasks } from "@/server/db/schema";

function parseCollectionInput(input: unknown): CreateCollectionInput {
  const parsed = createCollectionSchema.safeParse(input);
  if (!parsed.success) {
    throw new AppError(
      "VALIDATION",
      parsed.error.errors[0]?.message ?? "Invalid collection data"
    );
  }
  return parsed.data;
}

function parseUpdateCollectionInput(input: unknown): UpdateCollectionInput {
  const parsed = updateCollectionSchema.safeParse(input);
  if (!parsed.success) {
    throw new AppError(
      "VALIDATION",
      parsed.error.errors[0]?.message ?? "Invalid collection data"
    );
  }
  return parsed.data;
}

function parseCollectionId(collectionId: unknown): number {
  const id =
    typeof collectionId === "string"
      ? parseInt(collectionId, 10)
      : Number(collectionId);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("VALIDATION", "Invalid collection ID");
  }

  return id;
}

export const collectionService = {
  async getForCurrentUser(): Promise<CollectionWithTasks[]> {
    const user = await requireUser();
    return collectionRepository.findByUserId(user.id);
  },

  async create(input: unknown): Promise<void> {
    const user = await requireUser();
    await assertMutationRateLimit(user.id);

    const data = parseCollectionInput(input);
    await collectionRepository.create({
      name: data.name,
      color: data.color,
      userId: user.id,
    });

    revalidatePath("/dashboard", "page");
  },

  async update(input: unknown): Promise<void> {
    const user = await requireUser();
    await assertMutationRateLimit(user.id);

    const data = parseUpdateCollectionInput(input);
    const updated = await collectionRepository.update({
      collectionId: data.collectionId,
      userId: user.id,
      name: data.name,
      color: data.color,
    });

    if (!updated) {
      throw new AppError("NOT_FOUND", "Collection not found");
    }

    revalidatePath("/dashboard", "page");
  },

  async delete(collectionIdInput: unknown): Promise<void> {
    const user = await requireUser();
    await assertMutationRateLimit(user.id);

    const collectionId = parseCollectionId(collectionIdInput);
    const deleted = await collectionRepository.deleteByIdForUser(
      collectionId,
      user.id
    );

    if (!deleted) {
      throw new AppError("NOT_FOUND", "Collection not found");
    }

    revalidatePath("/dashboard", "page");
  },
};
