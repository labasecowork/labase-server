// src/modules/space/features/list_spaces/list_activated_spaces/domain/list_activated_spaces.schema.ts
import { z } from "zod";

export const ListActivatedSpacesSchema = z.object({
  type: z.enum(["unit", "shared_site", "full_room"]).optional(),
  capacity: z.number().int().positive().optional(),
  // Por defecto listamos ACTIVOS (disabled: false)
  available: z.boolean().optional().default(true),
});
