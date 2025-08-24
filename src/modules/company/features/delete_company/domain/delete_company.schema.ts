// src/modules/company/features/delete_company/domain/delete_company.schema.ts
import { z } from "zod";

export const DeleteCompanyParamsSchema = z.object({
  id: z.string().uuid("ID inválido"),
});
