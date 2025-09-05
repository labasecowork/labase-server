// src/modules/product/features/brand/edit_brand/domain/edit_brand.dto.ts
import { z } from "zod";
import { EditBrandSchema } from "./edit_brand.schema";

export type EditBrandDTO = z.infer<typeof EditBrandSchema>;
