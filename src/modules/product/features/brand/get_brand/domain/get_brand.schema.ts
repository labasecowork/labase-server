// src/modules/product/features/brand/get_brand/domain/get_brand.schema.ts
import { z } from "zod";

export const GetBrandQuerySchema = z.object({
  page: z
    .preprocess(
      (v) => (v === undefined ? undefined : Number(v)),
      z
        .number({
          invalid_type_error: "La página debe ser un número",
        })
        .int("La página debe ser un número entero")
        .positive("La página debe ser mayor a 0")
    )
    .default(1),

  limit: z
    .preprocess(
      (v) => (v === undefined ? undefined : Number(v)),
      z
        .number({
          invalid_type_error: "El límite debe ser un número",
        })
        .int("El límite debe ser un número entero")
        .positive("El límite debe ser mayor a 0")
    )
    .default(10),

  search: z
    .string({
      invalid_type_error: "El parámetro de búsqueda debe ser texto",
    })
    .trim()
    .optional(),
});
