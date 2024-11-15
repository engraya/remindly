import z from 'zod';
import { CollectionColors } from '@/lib/constants';


export const createCollectionSchema = z.object({
    name: z.string().min(4, { message: "Collection name must be at least 4 characters long" }),
    color: z.string().refine(color => Object.keys(CollectionColors).includes(color)),

})


export type CreateCollectionSchemaType = z.infer<typeof createCollectionSchema>;