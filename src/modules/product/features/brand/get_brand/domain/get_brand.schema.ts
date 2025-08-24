// src/modules/product/features/brand/get_brand/domain/get_brand.schema.ts
import { z } from "zod";

export const GetBrandQuerySchema = z.object({
  page: z
    .preprocess(
      (v) => (v === undefined ? undefined : Number(v)),
      z.number().int().positive(),
    )
    .default(1),
  limit: z
    .preprocess(
      (v) => (v === undefined ? undefined : Number(v)),
      z.number().int().positive(),
    )
    .default(10),
  search: z.string().trim().optional(),
});
