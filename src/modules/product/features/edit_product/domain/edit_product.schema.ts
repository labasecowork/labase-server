// src/modules/product/features/edit_product/domain/edit_product.schema.ts
import { z } from "zod";
import { unit_of_measure } from "@prisma/client";

export const EditProductSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  description: z.string().optional(),
  observations: z.string().optional(),
  quantity: z.number().int().nonnegative(),
  unit_of_measure: z.nativeEnum(unit_of_measure),
});