//src/modules/reservation/features/detail_reservation/domain/detail_reservation.dto.ts
import { z } from "zod";
import { DetailReservationParamsSchema } from "./detail_reservation.schema";

export type DetailReservationParamsDTO = z.infer<
  typeof DetailReservationParamsSchema
>;
