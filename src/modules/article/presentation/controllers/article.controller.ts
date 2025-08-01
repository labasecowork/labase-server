// src/modules/article/presentation/controllers/article.controller.ts
import { Request, Response } from "express";
import { ArticleService } from "../services/article.service";
import { CreateArticleSchema } from "../../domain/dtos/create_article.dto";
import { UpdateArticleSchema } from "../../domain/dtos/update_article.dto";
import { HttpStatusCodes } from "../../../../constants/http_status_codes";
import { buildHttpResponse } from "../../../../utils/build_http_response";
import { handleServerError } from "../../../../utils/error_handler";
import { MESSAGES } from "../../../../constants/messages";
import { ArticleRepository } from "../../data/repository/article.repository";
import { ArticleApi } from "../../data/api/article.api";
import { stripHtmlTags } from "../../../../utils/string_utils";
import { AppError } from "../../../../utils/errors";

const articleService = new ArticleService(
  new ArticleRepository(),
  new ArticleApi()
);

interface AuthReq extends Request {
  user?: { id: string }; // UUID
}
interface ArtCreateReq extends AuthReq {
  files?: {
    banner?: Express.Multer.File[];
    content?: Express.Multer.File[];
  };
}

export class ArticleController {
  /* ------------------------------------------------------------------ */
  /* CREATE                                                             */
  /* ------------------------------------------------------------------ */
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const r = req as ArtCreateReq;
      if (!r.user) throw new AppError("Unauthorized", HttpStatusCodes.UNAUTHORIZED.code);

      const banner = r.files?.banner?.[0];
      const content = r.files?.content?.[0];
      if (!banner || !content) {
        throw new AppError("banner and content files are required", HttpStatusCodes.BAD_REQUEST.code);
      }

      // Validaciones extra omitidas por brevedad…
      const cleaned = stripHtmlTags(content.buffer.toString("utf-8"));
      if (cleaned.length < 500) {
        throw new AppError("Content must exceed 500 chars", HttpStatusCodes.BAD_REQUEST.code);
      }

      const dto = CreateArticleSchema.parse(req.body);
      const result = await articleService.createArticle(
        r.user.id,
        dto,
        content,
        banner
      );

      return res.status(HttpStatusCodes.CREATED.code).json(
        buildHttpResponse(
          HttpStatusCodes.CREATED.code,
          MESSAGES.ARTICLE.ARTICLE_SUCCESS_CREATED,
          req.path,
          result
        )
      );
    } catch (err) {
      return handleServerError(res, req, err);
    }
  }

  /* ------------------------------------------------------------------ */
  /* READ – ALL                                                         */
  /* ------------------------------------------------------------------ */
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.max(1, parseInt(req.query.limit as string) || 10);

      const data = await articleService.getAllArticles(page, limit);
      return res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Articles retrieved successfully",
          "/articles",
          data
        )
      );
    } catch (err) {
      return handleServerError(res, req, err);
    }
  }

  /* ------------------------------------------------------------------ */
  /* READ – ONE                                                         */
  /* ------------------------------------------------------------------ */
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const article = await articleService.getArticleById(id);
      return res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Article retrieved successfully",
          `/articles/${id}`,
          article
        )
      );
    } catch (err) {
      return handleServerError(res, req, err);
    }
  }

  /* ------------------------------------------------------------------ */
  /* UPDATE                                                             */
  /* ------------------------------------------------------------------ */
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const r = req as ArtCreateReq;
      if (!r.user) throw new AppError("Unauthorized", HttpStatusCodes.UNAUTHORIZED.code);

      const dto = UpdateArticleSchema.parse(req.body);
      const updated = await articleService.updateArticle(
        req.params.id,
        r.user.id,
        dto,
        r.files
      );

      return res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          MESSAGES.ARTICLE.ARTICLE_SUCCESS_UPDATED,
          `/articles/${req.params.id}`,
          updated
        )
      );
    } catch (err) {
      return handleServerError(res, req, err);
    }
  }

  /* ------------------------------------------------------------------ */
  /* DELETE                                                             */
  /* ------------------------------------------------------------------ */
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const r = req as AuthReq;
      if (!r.user) throw new AppError("Unauthorized", HttpStatusCodes.UNAUTHORIZED.code);

      const deleted = await articleService.deleteArticle(req.params.id, r.user.id);
      return res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          MESSAGES.ARTICLE.ARTICLE_SUCCESS_DELETED,
          `/articles/${req.params.id}`,
          deleted
        )
      );
    } catch (err) {
      return handleServerError(res, req, err);
    }
  }
}
