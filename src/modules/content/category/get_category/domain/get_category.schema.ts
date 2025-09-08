//src/modules/content/category/get_category/domain/get_category.schema.ts
import { z } from "zod";

export const GetCategoryByIdSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});
export type GetCategoryByIdInput = z.infer<typeof GetCategoryByIdSchema>;
