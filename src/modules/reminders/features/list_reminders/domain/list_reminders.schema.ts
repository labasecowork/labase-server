import { z } from "zod";

export const ListRemindersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  is_active: z.coerce.boolean().optional(),
});

export type ListRemindersQueryInput = z.infer<typeof ListRemindersQuerySchema>;
