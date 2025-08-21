// src/modules/product/features/delete_product/presentation/delete_product.service.ts
import { DeleteProductRepository } from "../data/delete_product.repository";
import { AppError } from "../../../../../utils/errors";
import { PRODUCT_MESSAGES } from "../../../../../constants/messages/product";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { deleteFile } from "../../../../../infrastructure/aws";
import type { CurrentUser } from "../../../../../utils/authenticated_user"; // ✅ usa el tipo centralizado

export class DeleteProductService {
  constructor(private readonly repo = new DeleteProductRepository()) {}

  async execute(id: string, user: Pick<CurrentUser, "id" | "role">) {
    if (user.role !== "admin") {
      throw new AppError(
        PRODUCT_MESSAGES.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code,
      );
    }

    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new AppError(
        PRODUCT_MESSAGES.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code,
      );
    }

    if (existing.photo_url) {
      const key = new URL(existing.photo_url).pathname.slice(1);
      await deleteFile(key);
    }

    await this.repo.delete(id);
    return { message: PRODUCT_MESSAGES.DELETED_SUCCESS };
  }
}
