// src/modules/product/features/delete_product/data/delete_product.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class DeleteProductRepository {
  findById(id: string) {
    return prisma.products.findUnique({ where: { id } });
  }

  delete(id: string) {
    return prisma.products.delete({ where: { id } });
  }
}
