// src/modules/product/features/brand/get_brand/domain/get_brand.dto.ts
import { z } from "zod";
import { GetBrandQuerySchema } from "./get_brand.schema";

export type GetBrandQueryDTO = z.infer<typeof GetBrandQuerySchema>;
