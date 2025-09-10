//src/modules/content/category/create_category/domain/create_category.schema.ts
import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().optional(),
});
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
