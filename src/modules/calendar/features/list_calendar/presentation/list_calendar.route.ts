import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListCalendarController } from "./list_calendar.controller";

const router = Router();
const controller = new ListCalendarController();

/**
 * @openapi
 * /api/v1/calendar:
 *   get:
 *     tags:
 *       - Calendar
 *     summary: Obtener eventos del calendario semanal
 *     description: Devuelve una lista de reservas formateadas por día y horario para uso en el calendario visual.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de eventos
 */
router.get(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as listCalendarRoutes };
