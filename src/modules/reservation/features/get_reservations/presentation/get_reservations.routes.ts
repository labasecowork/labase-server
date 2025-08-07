// src/modules/reservation/features/get_reservations/presentation/get_reservations.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { GetReservationsController } from "./get_reservations.controller";

const router = Router();
const ctrl = new GetReservationsController();

/**
 * @openapi
 * /api/v1/reservations:
 *   get:
 *     tags: [Reservation]
 *     summary: Obtener todas las reservas (admin)
 *     description: Lista paginada de reservas con filtros opcionales.
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: 
 *           type: integer
 *           default: 10
 *         description: Número máximo de resultados por página
 *       - in: query
 *         name: page
 *         schema: 
 *           type: integer
 *           default: 1
 *         description: Número de página (basado en 1)
 *       - in: query
 *         name: spaceId
 *         schema: 
 *           type: string
 *           format: uuid
 *         description: Filtrar por ID del espacio
 *       - in: query
 *         name: fullRoom
 *         schema:
 *           type: boolean
 *         description: Filtrar por reservas de sala completa
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Desde esta fecha (inclusive)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Hasta esta fecha (inclusive)
 *     responses:
 *       200:
 *         description: Lista paginada de reservas
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Solo admins pueden acceder
 *       500:
 *         description: Error inesperado del servidor
 */
router.get("/", authenticateToken, asyncHandler(ctrl.handle.bind(ctrl)));

export { router as getReservationsRoutes };
