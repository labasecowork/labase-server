// src/modules/product/features/edit_product/presentation/edit_product.service.ts
import { EditProductDTO } from "../domain/edit_product.dto";
import { EditProductRepository } from "../data/edit_product.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { PRODUCT_MESSAGES } from "../../../../../constants/messages/product";
import { deleteFile } from "../../../../../infrastructure/aws";
import type { CurrentUser } from "../../../../../utils/authenticated_user";

export class EditProductService {
  constructor(private readonly repo = new EditProductRepository()) {}

  async execute(
    id: string,
    dto: EditProductDTO,
    user: Pick<CurrentUser, "id" | "role">,
    imageUrl: string,
  ) {
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

    if (existing.photo_url && imageUrl) {
      const key = new URL(existing.photo_url).pathname.slice(1);
      await deleteFile(key);
    }

    return this.repo.update(id, {
      ...dto,
      photo_url: imageUrl || existing.photo_url,
    });
  }
}
