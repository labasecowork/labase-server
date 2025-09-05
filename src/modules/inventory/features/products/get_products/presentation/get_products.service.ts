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
    const { page, limit, search, brand_id, brand_name } = query;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.repo.findMany({
        skip,
        take: limit,
        search,
        brandId: brand_id,
        brandName: brand_name,
      }),
      this.repo.count({ search, brandId: brand_id, brandName: brand_name }),
    ]);

    return {
      products: items,
      pagination: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit) || 1,
      },
    };
  }
}
