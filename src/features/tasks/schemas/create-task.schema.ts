import { z } from "zod";

export const createTaskSchema = z.object({
  collectionId: z.number().int().positive(),
  content: z.string().min(8, {
    message: "Task content must be at least 8 characters",
  }),
  expiresAt: z.coerce.date().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
