// src/modules/article/data/repository/article_category.repository.ts
import prisma from "../../../../config/prisma_client";
import { ArticleCategory } from "../../domain/entities/article_category.entity";
import {
  CreateArticleCategoryDto,
  UpdateArticleCategoryDto,
} from "../../domain/dtos/article_category.dto";

/**
 * Repositorio para gestionar operaciones CRUD de categorías de artículos
 */
export class ArticleCategoryRepository {
  /* ------------------------------------------------------------------ */
  /* CREATE                                                             */
  /* ------------------------------------------------------------------ */
  public async createCategory(
    data: CreateArticleCategoryDto,
  ): Promise<ArticleCategory> {
    const created = await prisma.article_categories.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return {
      id: created.id,
      name: created.name,
      description: created.description,
    };
  }

  /* ------------------------------------------------------------------ */
  /* READ – ALL                                                         */
  /* ------------------------------------------------------------------ */
  public async getAllCategories(): Promise<ArticleCategory[]> {
    const categories = await prisma.article_categories.findMany();
    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
    }));
  }

  /* ------------------------------------------------------------------ */
  /* READ – ONE                                                         */
  /* ------------------------------------------------------------------ */
  public async getCategoryById(id: string): Promise<ArticleCategory | null> {
    const found = await prisma.article_categories.findUnique({ where: { id } });
    return found
      ? { id: found.id, name: found.name, description: found.description }
      : null;
  }

  /* ------------------------------------------------------------------ */
  /* UPDATE                                                             */
  /* ------------------------------------------------------------------ */
  public async updateCategory(
    id: string,
    data: UpdateArticleCategoryDto,
  ): Promise<ArticleCategory> {
    const updated = await prisma.article_categories.update({
      where: { id },
      data,
    });

    return {
      id: updated.id,
      name: updated.name,
      description: updated.description,
    };
  }

  /* ------------------------------------------------------------------ */
  /* DELETE                                                             */
  /* ------------------------------------------------------------------ */
  public async deleteCategory(id: string): Promise<ArticleCategory> {
    const deleted = await prisma.article_categories.delete({ where: { id } });

    return {
      id: deleted.id,
      name: deleted.name,
      description: deleted.description,
    };
  }
}
