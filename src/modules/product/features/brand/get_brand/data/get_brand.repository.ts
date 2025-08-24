// src/modules/product/features/brand/get_brand/data/get_brand.repository.ts
import prisma from "../../../../../../config/prisma_client";

export type FindAllParams = {
  skip: number;
  take: number;
  search?: string;
};

export class GetBrandRepository {
  findById(id: string) {
    return prisma.product_brand.findUnique({ where: { id } });
  }

  findMany(params: FindAllParams) {
    const { skip, take, search } = params;
    return prisma.product_brand.findMany({
      skip,
      take,
      where: search
        ? { name: { contains: search, mode: "insensitive" } }
        : undefined,
      orderBy: { created_at: "desc" },
    });
  }

  count(search?: string) {
    return prisma.product_brand.count({
      where: search
        ? { name: { contains: search, mode: "insensitive" } }
        : undefined,
    });
  }
}
