// src/modules/product/features/brand/create_brand/domain/create_brand.schema.ts
import { z } from "zod";

export const CreateBrandSchema = z.object({
  name: z.string().trim().min(1, "Brand name is required"),
});
