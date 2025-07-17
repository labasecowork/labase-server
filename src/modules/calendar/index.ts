// src/modules/reservation/index.ts
import { Router } from "express";

import { listCalendarRoutes }  from "./features/index"; 

export const calendarRouter = Router();

calendarRouter.use("/",listCalendarRoutes);
/**
 * MATCHES:
 *  GET  /api/v1/reservations                    → listar TODAS las reservas (admin)
 */
export default calendarRouter;
