// src/modules/article/data/repository/article.repository.ts
import { article_status } from "@prisma/client";
import { Article } from "../../domain/entities/article.entity";
import { CreateArticleDTO } from "../../domain/dtos/create_article.dto";
import { UpdateArticleDTO } from "../../domain/dtos/update_article.dto";
import { MESSAGES } from "../../../../constants/messages";
import prisma from "../../../../config/prisma_client";
import { HttpStatusCodes } from "../../../../constants";
import { AppError } from "../../../../utils/errors";

interface PaginationParams {
  page: number;
  limit: number;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export class ArticleRepository {
  /* ------------------------------------------------------------------ */
  /* CREATE                                                             */
  /* ------------------------------------------------------------------ */
  async create(
    authorId: string,
    data: CreateArticleDTO,
    contentUrl: string,
    bannerUrl: string,
    resume: string,
    readingTime: number,
  ): Promise<Article> {
    const created = await prisma.articles.create({
      data: {
        author_id: authorId,
        title: data.title,
        content: contentUrl,
        banner: bannerUrl,
        resume,
        reading_time: readingTime,
        publication_timestamp: new Date(),
        status: "accepted" as article_status,
        category_id: data.categoryId,
      },
    });

    return {
      id: created.id,
      userId: created.author_id,
      title: created.title,
      content: created.content,
      banner: created.banner ?? "",
      resume: created.resume,
      readingTime: created.reading_time,
      categoryId: created.category_id,
      publicationTimestamp: created.publication_timestamp,
      status: created.status,
    };
  }

  /* ------------------------------------------------------------------ */
  /* LIST (paginated)                                                   */
  /* ------------------------------------------------------------------ */
  async getAll(params: PaginationParams): Promise<PaginatedResponse<any>> {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
      prisma.articles.findMany({
        skip,
        take: limit,
        include: {
          author: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
          article_category: { select: { name: true } },
        },
        orderBy: { publication_timestamp: "desc" },
      }),
      prisma.articles.count(),
    ]);

    return {
      data: articles,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      limit,
    };
  }

  /* ------------------------------------------------------------------ */
  /* GET ONE                                                            */
  /* ------------------------------------------------------------------ */
  async getById(articleId: string): Promise<any | null> {
    return prisma.articles.findUnique({
      where: { id: articleId },
      include: {
        author: {
          select: { first_name: true, last_name: true },
        },
        article_category: { select: { name: true } },
      },
    });
  }

  /* ------------------------------------------------------------------ */
  /* UPDATE                                                             */
  /* ------------------------------------------------------------------ */
  async update(
    articleId: string,
    authorId: string,
    data: UpdateArticleDTO,
    bannerUrl: string,
    contentUrl: string,
    resume: string,
    readingTime: number,
  ): Promise<any> {
    const article = await prisma.articles.findUnique({
      where: { id: articleId },
    });

    if (!article || article.author_id !== authorId) {
      throw new AppError(
        MESSAGES.ARTICLE.ARTICLE_ERROR_ACCESS_DENIED,
        HttpStatusCodes.UNAUTHORIZED.code,
      );
    }

    return prisma.articles.update({
      where: { id: articleId },
      data: {
        title: data.title,
        content: contentUrl,
        banner: bannerUrl,
        resume,
        reading_time: readingTime,
        category_id: data.categoryId,
      },
      include: {
        author: {
          select: { first_name: true, last_name: true },
        },
        article_category: { select: { name: true } },
      },
    });
  }

  /* ------------------------------------------------------------------ */
  /* DELETE                                                             */
  /* ------------------------------------------------------------------ */
  async delete(articleId: string, authorId: string): Promise<any> {
    const article = await prisma.articles.findUnique({
      where: { id: articleId },
    });

    if (!article || article.author_id !== authorId) {
      throw new AppError(
        MESSAGES.ARTICLE.ARTICLE_ERROR_ACCESS_DENIED,
        HttpStatusCodes.UNAUTHORIZED.code,
      );
    }

    return prisma.articles.delete({ where: { id: articleId } });
  }
}
