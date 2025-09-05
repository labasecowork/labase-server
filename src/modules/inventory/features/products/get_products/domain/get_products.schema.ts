import { z } from "zod";

export const GetProductsQuerySchema = z.object({
  page: z
    .preprocess(
      (v) => (v === undefined ? 1 : Number(v)),
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
      (v) => (v === undefined ? 10 : Number(v)),
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

  brand_id: z
    .string({
      invalid_type_error: "El ID de la marca debe ser una cadena (UUID)",
    })
    .uuid("El ID de la marca debe ser un UUID válido")
    .optional(),

  brand_name: z
    .string({
      invalid_type_error: "El nombre de la marca debe ser una cadena de texto",
    })
    .trim()
    .optional(),
});

export const GetProductParamSchema = z.object({
  id: z
    .string({
      required_error: "El ID del producto es obligatorio",
      invalid_type_error: "El ID del producto debe ser una cadena (UUID)",
    })
    .uuid("El ID del producto debe ser un UUID válido"),
});
