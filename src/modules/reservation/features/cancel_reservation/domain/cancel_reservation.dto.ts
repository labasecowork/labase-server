// src/modules/reservation/features/cancel_reservation/domain/dtos/cancel_reservation.dto.ts
import { z } from "zod";
import {
  CancelReservationParamsSchema,
  CancelReservationBodySchema,
} from "./cancel_reservation.schema";

export type CancelReservationParamsDTO = z.infer<
  typeof CancelReservationParamsSchema
>;
export type CancelReservationBodyDTO = z.infer<
  typeof CancelReservationBodySchema
>;
