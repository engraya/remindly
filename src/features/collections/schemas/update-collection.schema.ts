import { z } from "zod";
import { CollectionColors } from "@/lib/constants";

export const updateCollectionSchema = z.object({
  collectionId: z.number().int().positive(),
  name: z.string().min(4, {
    message: "Collection name must be at least 4 characters long",
  }),
  color: z
    .string()
    .refine((color) => Object.keys(CollectionColors).includes(color), {
      message: "Invalid collection color",
    }),
});

export type UpdateCollectionInput = z.infer<typeof updateCollectionSchema>;
