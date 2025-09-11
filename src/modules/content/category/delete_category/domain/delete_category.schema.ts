import { z } from "zod";

export const DeleteCategoryParamsSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});
export type DeleteCategoryParams = z.infer<typeof DeleteCategoryParamsSchema>;
