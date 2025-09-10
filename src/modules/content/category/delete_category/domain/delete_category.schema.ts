//src/modules/content/category/delete_category/domain/delete_category.schema.ts
import { z } from "zod";

export const DeleteCategoryParamsSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});
export type DeleteCategoryParams = z.infer<typeof DeleteCategoryParamsSchema>;
