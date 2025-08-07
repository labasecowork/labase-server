// src/modules/product/features/create_product/presentation/services/create_product.service.ts
import { CreateProductDTO } from "../domain/create_product.dto";
import { CreateProductRepository } from "../data/create_product.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { PRODUCT_MESSAGES } from "../../../../../constants/messages/product";

interface CurrentUser {
  id: string;
  role: "client" | "admin";
  admin_role?: "superadmin" | "manager";
}

export class CreateProductService {
  constructor(private readonly repo = new CreateProductRepository()) {}

  async execute(dto: CreateProductDTO, user: CurrentUser, imageUrl: string) {
    if (user.role !== "admin") {
      throw new AppError(
        PRODUCT_MESSAGES.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const created = await this.repo.create({
      ...dto,
      photo_url: imageUrl,
    });

    return {
      message: PRODUCT_MESSAGES.CREATED_SUCCESS,
      product_id: created.id,
    };
  }
}
