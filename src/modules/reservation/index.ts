// src/modules/reservation/index.ts
import { Router } from "express";

import { checkAvailabilityRoutes }  from "./features/check_availability";
import { createReservationRoutes }  from "./features/create_reservation";
import { listMyReservationsRoutes } from "./features/list_my_reservations";
import { resolveQrRoutes } from "./features/resolve_qr";

export const reservationRouter = Router();

reservationRouter.use("/",           createReservationRoutes);
reservationRouter.use("/availability", checkAvailabilityRoutes);
reservationRouter.use("/mine",         listMyReservationsRoutes);
reservationRouter.use("/resolve",      resolveQrRoutes); 
/**
 *  MATCHES:
 *  POST /api/v1/reservations            → crear reserva
 *  GET  /api/v1/reservations/availability?spaceId=...&startTime=...&endTime=...
 *                                       → chequear disponibilidad
 *  GET  /api/v1/reservations/mine       → listar mis reservas (paginado)
 *  POST /api/v1/reservations/resolve    → obtener reserva desde código QR
 */

export default reservationRouter;
