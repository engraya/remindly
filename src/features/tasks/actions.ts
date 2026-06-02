"use server";

import { taskService } from "@/server/services/task.service";
import { parseNaturalLanguageTask } from "@/server/ai/parse-natural-language-task";
import { requireUser } from "@/server/auth/require-user";
import { assertMutationRateLimit, assertAiRateLimit } from "@/server/rate-limit";

export async function createTaskAction(input: unknown) {
  return taskService.create(input);
}

export async function setTaskToDoneAction(taskId: unknown) {
  return taskService.markDone(taskId);
}

export async function createTaskFromNaturalLanguageAction(
  collectionId: number,
  naturalLanguage: string
) {
  const user = await requireUser();
  await assertMutationRateLimit(user.id);
  await assertAiRateLimit(user.id);

  const parsed = await parseNaturalLanguageTask(naturalLanguage);

  return taskService.create({
    collectionId,
    content: parsed.content,
    expiresAt: parsed.expiresAt ? new Date(parsed.expiresAt) : undefined,
  });
}
