// src/modules/product/features/brand/get_brand/data/get_brand.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class GetBrandRepository {
  findById(id: string) {
    return prisma.product_brand.findUnique({ where: { id } });
  }

  findMany() {
    return prisma.product_brand.findMany({
      orderBy: { created_at: "desc" },
    });
  }
}
