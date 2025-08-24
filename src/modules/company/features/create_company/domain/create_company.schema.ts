// src/modules/company/features/create_company/domain/create_company.schema.ts
import { z } from "zod";

export const CreateCompanySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
});
