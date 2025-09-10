//src/modules/content/category/get_category/data/get_category.repository.ts
import prisma from "../../../../../config/prisma_client";

export class GetCategoryRepository {
  findAll() {
    return prisma.article_categories.findMany({ orderBy: { name: "asc" } });
  }
  findById(id: string) {
    return prisma.article_categories.findUnique({ where: { id } });
  }
}
