// src/modules/workarea/features/list_workareas/domain/list_workareas.schema.ts
import { z } from "zod";

export const ListWorkAreasSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  disabled: z.coerce.boolean().optional(),
});
