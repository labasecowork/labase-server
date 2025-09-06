// src/modules/product/features/get_products/presentation/get_products.service.ts
import { Pagination } from "../../../../../../utils/pagination";
import { GetProductsRepository } from "../data/get_products.repository";
import { AppError } from "../../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../../constants/messages";
import type { GetProductsQueryDTO } from "../domain/get_products.dto";

export class GetProductsService {
  constructor(private readonly repo = new GetProductsRepository()) {}

  async getOne(id: string) {
    const product = await this.repo.findById(id);
    if (!product) {
      throw new AppError(
        MESSAGES.PRODUCT.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    return product;
  }

  async getAll(query: GetProductsQueryDTO) {
    const { page, limit, skip } = Pagination.getPaginationParams(query);

    const [items, total] = await Promise.all([
      this.repo.findMany({
        skip,
        take: limit,
        search: query.search,
        brandId: query.brand_id,
        brandName: query.brand_name,
      }),
      this.repo.count({
        search: query.search,
        brandId: query.brand_id,
        brandName: query.brand_name,
      }),
    ]);

    return {
      items,
      meta: Pagination.buildPaginationMeta(total, page, limit),
    };
  }
}
