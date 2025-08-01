// src/modules/reservation/features/get_reservations/domain/get_reservations.schema.ts
import { z } from "zod";

export const GetReservationsSchema = z.object({
  limit:    z.coerce.number().int().positive().default(10),
  page:     z.coerce.number().int().positive().default(1),
  from:     z.string().datetime().optional(),
  to:       z.string().datetime().optional(),
  spaceId:  z.string().uuid().optional(),
  fullRoom: z.coerce.boolean().optional(),
});
