// src/modules/product/features/edit_product/domain/edit_product.dto.ts
import { z } from "zod";
import { EditProductSchema } from "./edit_product.schema";

export type EditProductDTO = z.infer<typeof EditProductSchema>;
