// src/modules/product/features/brand/get_brand/presentation/get_brand.service.ts
import { GetBrandRepository } from "../data/get_brand.repository";
import { AppError } from "../../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../../constants/messages";

export class GetBrandService {
  constructor(private readonly repo = new GetBrandRepository()) {}

  async getOne(id: string) {
    const brand = await this.repo.findById(id);
    if (!brand) {
      throw new AppError(
        MESSAGES.PRODUCT.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    return brand;
  }

  async getAll() {
    const items = this.repo.findMany();

    return items;
  }
}
