// src/modules/space/features/list_spaces/domain/list_spaces.schema.ts
import { z } from "zod";

export const ListSpacesSchema = z.object({
  type: z.enum(["unit", "shared_site", "full_room"]).optional(),
  capacity: z.number().int().positive().optional(),
  available: z.boolean().optional().default(true),
  status: z.enum(["active", "inactive", "all"]).optional().default("active"),
});
