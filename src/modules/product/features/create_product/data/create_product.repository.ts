// src/modules/product/features/create_product/data/create_product.repository.ts
import prisma from "../../../../../config/prisma_client";
import { Prisma } from "@prisma/client";

export class CreateProductRepository {
  create(data: Prisma.productsCreateInput) {
    return prisma.products.create({ data });
  }
}
