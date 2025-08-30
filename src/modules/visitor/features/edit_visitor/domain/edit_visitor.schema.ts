// src/modules/visitor/features/edit_visitor/domain/edit_visitor.schema.ts
import { z } from "zod";

export const EditVisitorSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email().optional(),
  exit_time: z.string().datetime().optional(),
  space_id: z.string().uuid().optional(),
});
