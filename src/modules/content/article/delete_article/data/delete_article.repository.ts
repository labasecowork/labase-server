//src/modules/content/article/delete_article/data/delete_article.repository.ts
import prisma from "../../../../../config/prisma_client";

export class DeleteArticleRepository {
  findById(id: string) {
    return prisma.articles.findUnique({ where: { id } });
  }
  delete(id: string) {
    return prisma.articles.delete({ where: { id } });
  }
}
