//src/modules/content/category/delete_category/data/delete_category.repository.ts
import prisma from "../../../../../config/prisma_client";

export class DeleteCategoryRepository {
  findById(id: string) {
    return prisma.article_categories.findUnique({ where: { id } });
  }
  delete(id: string) {
    return prisma.article_categories.delete({ where: { id } });
  }
}
