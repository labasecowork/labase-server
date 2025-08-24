// src/modules/workarea/features/delete_workarea/domain/delete_workarea.schema.ts
import { z } from "zod";

export const DeleteWorkAreaParamsSchema = z.object({
  id: z.string().uuid("ID inválido"),
});
