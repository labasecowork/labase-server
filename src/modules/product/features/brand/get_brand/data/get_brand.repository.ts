// src/modules/product/features/brand/get_brand/data/get_brand.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class GetBrandRepository {
  findById(id: string) {
    return prisma.product_brand.findUnique({ where: { id } });
  }

  findMany(search?: string) {
    return prisma.product_brand.findMany({
      where: search
        ? { name: { contains: search, mode: "insensitive" } }
        : undefined,
      orderBy: { created_at: "desc" },
    });
  }
}
