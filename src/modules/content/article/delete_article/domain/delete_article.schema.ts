//src/modules/content/article/delete_article/domain/delete_article.schema.ts
import { z } from "zod";

export const DeleteArticleParamsSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});

export type DeleteArticleParams = z.infer<typeof DeleteArticleParamsSchema>;
