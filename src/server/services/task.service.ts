import { revalidatePath } from "next/cache";
import { AppError } from "@/server/errors";
import { requireUser } from "@/server/auth/require-user";
import { assertCollectionOwner } from "@/server/auth/assert-ownership";
import { assertMutationRateLimit } from "@/server/rate-limit";
import { taskRepository } from "@/server/repositories/task.repository";
import {
  createTaskSchema,
  type CreateTaskInput,
} from "@/features/tasks/schemas/create-task.schema";
import {
  updateTaskSchema,
  type UpdateTaskInput,
} from "@/features/tasks/schemas/update-task.schema";
import { assertTaskOwner } from "@/server/auth/assert-ownership";

function parseTaskInput(input: unknown): CreateTaskInput {
  const parsed = createTaskSchema.safeParse(input);
  if (!parsed.success) {
    throw new AppError(
      "VALIDATION",
      parsed.error.errors[0]?.message ?? "Invalid task data"
    );
  }
  return parsed.data;
}

function parseUpdateTaskInput(input: unknown): UpdateTaskInput {
  const parsed = updateTaskSchema.safeParse(input);
  if (!parsed.success) {
    throw new AppError(
      "VALIDATION",
      parsed.error.errors[0]?.message ?? "Invalid task data"
    );
  }
  return parsed.data;
}

function parseTaskId(taskId: unknown): number {
  const id =
    typeof taskId === "string" ? parseInt(taskId, 10) : Number(taskId);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("VALIDATION", "Invalid task ID");
  }

  return id;
}

export const taskService = {
  async create(input: unknown): Promise<void> {
    const user = await requireUser();
    await assertMutationRateLimit(user.id);

    const data = parseTaskInput(input);
    await assertCollectionOwner(user.id, data.collectionId);

    await taskRepository.create({
      content: data.content,
      userId: user.id,
      collectionId: data.collectionId,
      expireAt: data.expiresAt ?? null,
    });

    revalidatePath("/dashboard", "page");
  },

  async delete(taskIdInput: unknown): Promise<void> {
    const user = await requireUser();
    await assertMutationRateLimit(user.id);

    const taskId = parseTaskId(taskIdInput);
    const deleted = await taskRepository.delete(taskId, user.id);

    if (!deleted) {
      throw new AppError("NOT_FOUND", "Task not found");
    }

    revalidatePath("/dashboard", "page");
  },

  async update(input: unknown): Promise<void> {
    const user = await requireUser();
    await assertMutationRateLimit(user.id);

    const data = parseUpdateTaskInput(input);
    await assertTaskOwner(user.id, data.taskId);

    const updated = await taskRepository.update({
      taskId: data.taskId,
      userId: user.id,
      content: data.content,
      expireAt: data.expiresAt ?? null,
    });

    if (!updated) {
      throw new AppError("NOT_FOUND", "Task not found");
    }

    revalidatePath("/dashboard", "page");
  },

  async markDone(taskIdInput: unknown): Promise<void> {
    const user = await requireUser();
    await assertMutationRateLimit(user.id);

    const taskId = parseTaskId(taskIdInput);
    const updated = await taskRepository.markDone(taskId, user.id);

    if (!updated) {
      throw new AppError("NOT_FOUND", "Task not found");
    }

    revalidatePath("/dashboard", "page");
  },
};
