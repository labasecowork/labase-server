// src/modules/reservation/features/cancel_reservation/domain/cancel_reservation.schema.ts
import { z } from "zod";

export const CancelReservationParamsSchema = z.object({
  id: z.string().uuid("id must be a valid UUID"),
});

export const CancelReservationBodySchema = z
  .object({
    reason: z.string().max(255).optional(),
  })
  .optional()
  .default({});
