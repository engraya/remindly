import { z } from "zod";

export const updateTaskSchema = z.object({
  taskId: z.number().int().positive(),
  content: z.string().min(8, {
    message: "Task content must be at least 8 characters",
  }),
  expiresAt: z.coerce.date().optional().nullable(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
