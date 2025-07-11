// src/modules/space/features/list_spaces/domain/list_spaces.schema.ts
import { z } from "zod";

export const ListSpacesSchema = z.object({
  type: z.enum(["UNIT", "SHARED_SITE", "FULL_ROOM"]).optional(),
  capacity: z.number().int().positive().optional(),
  available: z.boolean().optional().default(true),
});
