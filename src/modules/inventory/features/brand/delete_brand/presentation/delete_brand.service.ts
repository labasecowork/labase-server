// src/modules/product/features/brand/delete_brand/application/delete_brand.service.ts
import { DeleteBrandRepository } from "../data/delete_brand.repository";
import { AppError } from "../../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import type { CurrentUser } from "../../../../../../utils/authenticated_user";
import { MESSAGES } from "../../../../../../constants/messages/";

export class DeleteBrandService {
  constructor(private readonly repo = new DeleteBrandRepository()) {}

  async execute(id: string, user: Pick<CurrentUser, "id" | "role">) {
    if (user.role !== "admin") {
      throw new AppError(
        MESSAGES.BRAND.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code,
      );
    }

    const brand = await this.repo.findById(id);
    if (!brand) {
      throw new AppError(
        MESSAGES.BRAND.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code,
      );
    }

    // Evitar borrar marcas con productos asociados
    const productCount = await this.repo.countProductsByBrand(id);
    if (productCount > 0) {
      throw new AppError(
        MESSAGES.BRAND.HAS_PRODUCTS,
        HttpStatusCodes.CONFLICT.code,
      );
    }

    await this.repo.delete(id);
    return { message: MESSAGES.BRAND.DELETED_SUCCESS };
  }
}
