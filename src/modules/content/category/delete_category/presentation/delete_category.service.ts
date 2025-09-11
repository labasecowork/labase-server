import { DeleteCategoryRepository } from "../data/delete_category.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class DeleteCategoryService {
  constructor(private readonly repo = new DeleteCategoryRepository()) {}

  async execute(id: string) {
    const exists = await this.repo.findById(id);
    if (!exists) {
      throw new AppError("Category not found", HttpStatusCodes.NOT_FOUND.code);
    }
    await this.repo.delete(id);
    return { success: true, message: "Category deleted successfully" };
  }
}
