// src/modules/product/features/brand/get_brand/domain/get_brand.schema.ts
import { z } from "zod";

export const GetBrandQuerySchema = z.object({
  search: z
    .string({
      invalid_type_error: "El parámetro de búsqueda debe ser texto",
    })
    .trim()
    .optional(),
});
