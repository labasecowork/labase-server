// src/modules/company/features/list_companies/domain/list_companies.schema.ts
import { z } from "zod";

export const ListCompaniesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
});
