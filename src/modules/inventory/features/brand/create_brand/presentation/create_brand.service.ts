// src/modules/product/features/brand/create_brand/presentation/services/create_brand.service.ts
import { CreateBrandDTO } from "../domain/create_brand.dto";
import { CreateBrandRepository } from "../data/create_brand.repository";
import { AppError } from "../../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../../constants/messages";
import type { CurrentUser } from "../../../../../../utils/authenticated_user";

export class CreateBrandService {
  constructor(private readonly repo = new CreateBrandRepository()) {}

  async execute(dto: CreateBrandDTO, user: Pick<CurrentUser, "id" | "role">) {
    if (user.role !== "admin") {
      throw new AppError(
        MESSAGES.BRAND.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code,
      );
    }

    // Evitar duplicados por nombre (unique)
    const exists = await this.repo.findByName(dto.name);
    if (exists) {
      throw new AppError(
        MESSAGES.BRAND.DUPLICATED_NAME,
        HttpStatusCodes.CONFLICT.code,
      );
    }

    const created = await this.repo.create({ name: dto.name });

    return {
      message: MESSAGES.BRAND.CREATED_SUCCESS,
      brand_id: created.id,
    };
  }
}
