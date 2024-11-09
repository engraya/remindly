import z from 'zod';

export const createTaskSchema = z.object({
    collectionId : z.number().nonnegative(),
    content : z.string().min(8, {
        message : "Task content must e at least 8 characters"
    }),
    expiresAt : z.date().optional()
})

export type CreateTaskShemaType = z.infer<typeof createTaskSchema>