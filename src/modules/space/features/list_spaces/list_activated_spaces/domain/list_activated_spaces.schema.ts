// src/modules/space/features/list_spaces/list_activated_spaces/domain/list_activated_spaces.schema.ts
import { z } from "zod";

export const ListActivatedSpacesSchema = z.object({
  type: z.enum(["UNIT", "SHARED_SITE", "FULL_ROOM"]).optional(),
  capacity: z.number().int().positive().optional(),
  // Por defecto listamos ACTIVOS (disabled: false)
  available: z.boolean().optional().default(true),
});
