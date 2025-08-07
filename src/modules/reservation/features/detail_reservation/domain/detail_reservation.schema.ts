//src/modules/reservation/features/detail_reservation/domain/detail_reservation.schema.ts
import { z } from "zod";

export const DetailReservationParamsSchema = z.object({
  id: z.string().uuid("ID de reserva inválido"),
});
