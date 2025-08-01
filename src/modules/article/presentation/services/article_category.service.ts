// src/modules/article/presentation/services/article_category.service.ts
import { ArticleCategoryRepository } from "../../data/repository/article_category.repository";
import {
  CreateArticleCategoryDto,
  UpdateArticleCategoryDto,
} from "../../domain/dtos/article_category.dto";
import { ArticleCategory } from "../../domain/entities/article_category.entity";
import { AppError } from "../../../../utils/errors";
import { HttpStatusCodes } from "../../../../constants";

export class ArticleCategoryService {
  private readonly repo = new ArticleCategoryRepository();

  /* ------------------------------------------------------------------ */
  /* CREATE                                                             */
  /* ------------------------------------------------------------------ */
  async createCategory(data: CreateArticleCategoryDto): Promise<ArticleCategory> {
    try {
      return await this.repo.createCategory(data);
    } catch (_) {
      throw new AppError(
        "Error creating article category",
        HttpStatusCodes.INTERNAL_SERVER_ERROR.code
      );
    }
  }

  /* ------------------------------------------------------------------ */
  /* READ – ALL                                                         */
  /* ------------------------------------------------------------------ */
  async getAllCategories(): Promise<ArticleCategory[]> {
    try {
      return await this.repo.getAllCategories();
    } catch (_) {
      throw new AppError(
        "Error fetching article categories",
        HttpStatusCodes.INTERNAL_SERVER_ERROR.code
      );
    }
  }

  /* ------------------------------------------------------------------ */
  /* READ – ONE                                                         */
  /* ------------------------------------------------------------------ */
  async getCategoryById(id: string): Promise<ArticleCategory> {
    const category = await this.repo.getCategoryById(id);
    if (!category) {
      throw new AppError("Category not found", HttpStatusCodes.NOT_FOUND.code);
    }
    return category;
  }

  /* ------------------------------------------------------------------ */
  /* UPDATE                                                             */
  /* ------------------------------------------------------------------ */
  async updateCategory(
    id: string,
    data: UpdateArticleCategoryDto
  ): Promise<ArticleCategory> {
    await this.getCategoryById(id); // lanza 404 si no existe
    return this.repo.updateCategory(id, data);
  }

  /* ------------------------------------------------------------------ */
  /* DELETE                                                             */
  /* ------------------------------------------------------------------ */
  async deleteCategory(id: string): Promise<{ success: boolean; message: string }> {
    await this.getCategoryById(id);
    await this.repo.deleteCategory(id);
    return { success: true, message: "Category deleted successfully" };
  }
}
