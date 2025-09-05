// src/modules/product/features/brand/edit_brand/domain/edit_brand.schema.ts
import { z } from "zod";

export const EditBrandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
});
