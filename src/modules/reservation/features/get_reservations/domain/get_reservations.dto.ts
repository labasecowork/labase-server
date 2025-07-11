// src/modules/reservation/features/get_reservations/domain/get_reservations.dto.ts
import { z } from "zod";
import { GetReservationsSchema } from "./get_reservations.schema";

export type GetReservationsDTO = z.infer<typeof GetReservationsSchema>;
