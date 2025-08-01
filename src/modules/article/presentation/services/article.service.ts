// src/modules/article/presentation/services/article.service.ts
import { ArticleRepository } from "../../data/repository/article.repository";
import { CreateArticleDTO } from "../../domain/dtos/create_article.dto";
import { UpdateArticleDTO } from "../../domain/dtos/update_article.dto";
import { MESSAGES } from "../../../../constants/messages";
import prisma from "../../../../config/prisma_client";
import { HttpStatusCodes } from "../../../../constants";
import { AppError } from "../../../../utils/errors";
import { uploadFile, deleteFile } from "../../../../infrastructure/aws";
import { ArticleApi } from "../../data/api/article.api";
import {
  estimateReadingTimeByCharacters,
  stripHtmlTags,
} from "../../../../utils";

export class ArticleService {
  constructor(
    private readonly articleRepo = new ArticleRepository(),
    private readonly articleApi = new ArticleApi()
  ) {}

  /* ------------------------------------------------------------------ */
  /* CREATE                                                             */
  /* ------------------------------------------------------------------ */
  async createArticle(
    userId: string,
    data: CreateArticleDTO,
    contentFile: Express.Multer.File,
    bannerFile: Express.Multer.File
  ) {
    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user || user.status !== "active") {
      throw new AppError(
        MESSAGES.ARTICLE.ARTICLE_ERROR_ACCESS_DENIED,
        HttpStatusCodes.UNAUTHORIZED.code
      );
    }

    // Sube archivos
    const [bannerResp, contentResp] = await Promise.all([
      uploadFile(bannerFile, "public/articles/banner"),
      uploadFile(contentFile, "public/articles/content"),
    ]);

    // Genera resumen y tiempo de lectura
    const cleaned = stripHtmlTags(contentFile.buffer.toString("utf-8"));
    const readingTime = estimateReadingTimeByCharacters(cleaned);
    const resume =
      (await this.articleApi.generateResume(cleaned)) ?? null;

    const article = await this.articleRepo.create(
      userId,
      data,
      contentResp.url,
      bannerResp.url,
      resume,
      readingTime
    );

    return { message: "Article created successfully", article };
  }

  /* ------------------------------------------------------------------ */
  /* READ – ALL                                                         */
  /* ------------------------------------------------------------------ */
  getAllArticles(page = 1, limit = 10) {
    return this.articleRepo.getAll({ page, limit });
  }

  /* ------------------------------------------------------------------ */
  /* READ – ONE                                                         */
  /* ------------------------------------------------------------------ */
  async getArticleById(articleId: string) {
    const article = await this.articleRepo.getById(articleId);
    if (!article) {
      throw new AppError(
        MESSAGES.ARTICLE.ARTICLE_ERROR_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    return article;
  }

  /* ------------------------------------------------------------------ */
  /* UPDATE                                                             */
  /* ------------------------------------------------------------------ */
  async updateArticle(
    articleId: string,
    userId: string,
    data: UpdateArticleDTO,
    files?: { banner?: Express.Multer.File[]; content?: Express.Multer.File[] }
  ) {
    const article = await this.getArticleById(articleId);

    if (article.author_id !== userId) {
      throw new AppError(
        MESSAGES.ARTICLE.ARTICLE_ERROR_ACCESS_DENIED,
        HttpStatusCodes.UNAUTHORIZED.code
      );
    }

    let bannerUrl = article.banner;
    let contentUrl = article.content;
    let readingTime = article.reading_time;
    let resume = article.resume;

    /* ---------- banner (opcional) ----------------- */
    if (files?.banner?.[0]) {
      const resp = await uploadFile(files.banner[0], "public/articles/banner");
      bannerUrl = resp.url;
      await deleteFile(article.banner.split(".amazonaws.com/")[1]);
    }

    /* ---------- content (opcional) ---------------- */
    if (files?.content?.[0]) {
      const resp = await uploadFile(files.content[0], "public/articles/content");
      contentUrl = resp.url;

      const cleaned = stripHtmlTags(files.content[0].buffer.toString("utf-8"));
      readingTime = estimateReadingTimeByCharacters(cleaned);
      resume = (await this.articleApi.generateResume(cleaned)) ?? article.resume;

      await deleteFile(article.content.split(".amazonaws.com/")[1]);
    }

    const updated = await this.articleRepo.update(
      articleId,
      userId,
      data,
      bannerUrl,
      contentUrl,
      resume,
      readingTime
    );

    return { message: "Article updated successfully", article: updated };
  }

  /* ------------------------------------------------------------------ */
  /* DELETE                                                             */
  /* ------------------------------------------------------------------ */
  async deleteArticle(articleId: string, userId: string) {
    const article = await this.getArticleById(articleId);

    if (article.author_id !== userId) {
      throw new AppError(
        MESSAGES.ARTICLE.ARTICLE_ERROR_ACCESS_DENIED,
        HttpStatusCodes.UNAUTHORIZED.code
      );
    }

    await Promise.all([
      deleteFile(article.banner.split(".amazonaws.com/")[1]),
      deleteFile(article.content.split(".amazonaws.com/")[1]),
    ]);

    return this.articleRepo.delete(articleId, userId);
  }
}
