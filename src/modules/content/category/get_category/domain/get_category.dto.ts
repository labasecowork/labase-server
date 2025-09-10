//src/modules/content/category/get_category/domain/get_category.dto.ts
export interface CategoryResponseDto {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
}
