//src/modules/content/article/get_article/domain/get_article.schema.ts
import { z } from "zod";

export const GetArticleByIdSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});

export type GetArticleByIdInput = z.infer<typeof GetArticleByIdSchema>;
