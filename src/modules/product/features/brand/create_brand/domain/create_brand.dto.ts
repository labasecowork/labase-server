// src/modules/product/features/brand/create_brand/domain/create_brand.dto.ts
import { z } from "zod";
import { CreateBrandSchema } from "./create_brand.schema";

export type CreateBrandDTO = z.infer<typeof CreateBrandSchema>;

export interface CreateBrandResponseDTO {
  message: string;
  brand_id: string;
}
