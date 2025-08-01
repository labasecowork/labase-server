// src/modules/article/presentation/controllers/article_category.controller.ts
import { Request, Response } from "express";
import { ArticleCategoryService } from "../services/article_category.service";
import {
  CreateArticleCategoryDto,
  UpdateArticleCategoryDto,
} from "../../domain/dtos/article_category.dto";
import { handleServerError } from "../../../../utils/error_handler";
import { buildHttpResponse } from "../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../constants";

export class ArticleCategoryController {
  private readonly service = new ArticleCategoryService();

  /* ------------------------------------------------------------------ */
  /* CREATE                                                             */
  /* ------------------------------------------------------------------ */
  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreateArticleCategoryDto = req.body;
      const category = await this.service.createCategory(dto);

      res.status(HttpStatusCodes.CREATED.code).json(
        buildHttpResponse(
          HttpStatusCodes.CREATED.code,
          "Category created successfully",
          req.path,
          category
        )
      );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }

  /* ------------------------------------------------------------------ */
  /* READ – ALL                                                         */
  /* ------------------------------------------------------------------ */
  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.service.getAllCategories();
      res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Categories retrieved successfully",
          req.path,
          categories
        )
      );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }

  /* ------------------------------------------------------------------ */
  /* READ – ONE                                                         */
  /* ------------------------------------------------------------------ */
  async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; // UUID string
      const category = await this.service.getCategoryById(id);

      res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Category retrieved successfully",
          req.path,
          category
        )
      );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }

  /* ------------------------------------------------------------------ */
  /* UPDATE                                                             */
  /* ------------------------------------------------------------------ */
  async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const dto: UpdateArticleCategoryDto = req.body;

      const category = await this.service.updateCategory(id, dto);
      res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Category updated successfully",
          req.path,
          category
        )
      );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }

  /* ------------------------------------------------------------------ */
  /* DELETE                                                             */
  /* ------------------------------------------------------------------ */
  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.service.deleteCategory(id);

      res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          result.message,
          req.path,
          result
        )
      );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }
}
