import { z } from "zod";

export const GetProductsQuerySchema = z.object({
  page: z
    .preprocess(
      (v) => (v === undefined ? 1 : Number(v)),
      z.number().int().positive(),
    )
    .default(1),
  limit: z
    .preprocess(
      (v) => (v === undefined ? 10 : Number(v)),
      z.number().int().positive(),
    )
    .default(10),
  search: z.string().trim().optional(),
  brand_id: z.string().uuid().optional(),
  brand_name: z.string().trim().optional(),
});

export const GetProductParamSchema = z.object({
  id: z.string().uuid(),
});
