// src/modules/employee/features/list_employees/domain/list_employees.schema.ts
import { z } from "zod";

export const ListEmployeesSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  status: z.enum(["active", "suspended", "pending"]).optional(),
  search: z.string().optional(),
});
