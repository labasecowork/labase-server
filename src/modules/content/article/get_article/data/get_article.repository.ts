//src/modules/content/article/get_article/data/get_article.repository.ts
import prisma from "../../../../../config/prisma_client";

export class GetArticleRepository {
  async findMany(skip: number, take: number) {
    return prisma.articles.findMany({
      skip,
      take,
      include: {
        author: { select: { first_name: true, last_name: true } },
        article_category: { select: { name: true } },
      },
      orderBy: { publication_timestamp: "desc" },
    });
  }

  count() {
    return prisma.articles.count();
  }

  findById(id: string) {
    return prisma.articles.findUnique({
      where: { id },
      include: {
        author: { select: { first_name: true, last_name: true } },
        article_category: { select: { name: true } },
      },
    });
  }
}
