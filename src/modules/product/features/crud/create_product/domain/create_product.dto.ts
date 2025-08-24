// src/modules/product/features/crud/create_product/domain/create_product.dto.ts
import { z } from "zod";
import { CreateProductSchema } from "./create_product.schema";

export type CreateProductDTO = z.infer<typeof CreateProductSchema>;

export interface CreateProductResponseDTO {
  message: string;
  product_id: string;
}
