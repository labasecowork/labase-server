// src/modules/article/domain/entities/article_category.entity.ts
export interface ArticleCategory {
  readonly id: string;        
  readonly name: string;
  readonly description: string | null;
}
