// src/modules/company/features/list_companies/domain/list_companies.schema.ts
import { z } from "zod";

export const ListCompaniesSchema = z.object({
  search: z.string().optional(),
});
