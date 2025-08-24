// src/modules/reservation/features/create_reservation/domain/dtos/create_reservation.dto.ts
import { z } from "zod";
import { CreateReservationSchema } from "./create_reservation.schema";

export type CreateReservationDTO = z.infer<typeof CreateReservationSchema>;

export interface CreateReservationResponseDTO {
  message: string;
  reservation_id: string;
  codeQr: string;
  price: number;
  status: "pending" | "confirmed" | "cancelled";
}
