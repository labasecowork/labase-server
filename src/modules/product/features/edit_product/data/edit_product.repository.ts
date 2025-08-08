// src/modules/product/features/edit_product/data/edit_product.repository.ts
import prisma from "../../../../../config/prisma_client";

export class EditProductRepository {
  findById(id: string) {
    return prisma.products.findUnique({ where: { id } });
  }

  update(id: string, data: Partial<any>) {
    return prisma.products.update({ where: { id }, data });
  }
}
