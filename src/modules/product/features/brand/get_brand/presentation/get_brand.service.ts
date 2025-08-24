// src/modules/product/features/brand/get_brand/presentation/get_brand.service.ts
import { GetBrandRepository } from "../data/get_brand.repository";
import { AppError } from "../../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../../constants/messages";
import type { GetBrandQueryDTO } from "../domain/get_brand.dto";

export class GetBrandService {
  constructor(private readonly repo = new GetBrandRepository()) {}

  async getOne(id: string) {
    const brand = await this.repo.findById(id);
    if (!brand) {
      throw new AppError(
        MESSAGES.PRODUCT.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code,
      );
    }
    return brand;
  }

  async getAll(query: GetBrandQueryDTO) {
    const { page, limit, search } = query;
    const skip = (page - 1) * limit;

    // Ejecutamos en paralelo porque NO dependen entre sí
    const [items, total] = await Promise.all([
      this.repo.findMany({ skip, take: limit, search }),
      this.repo.count(search),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }
}
