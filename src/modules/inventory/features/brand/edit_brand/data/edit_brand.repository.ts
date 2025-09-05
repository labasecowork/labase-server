// src/modules/product/features/brand/edit_brand/data/edit_brand.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class EditBrandRepository {
  findById(id: string) {
    return prisma.product_brand.findUnique({ where: { id } });
  }

  findByName(name: string) {
    return prisma.product_brand.findUnique({ where: { name } });
  }

  update(id: string, data: Partial<{ name: string }>) {
    return prisma.product_brand.update({ where: { id }, data });
  }
}
