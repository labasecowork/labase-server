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
 *         example: 10
 *       - in: query
 *         name: page
 *         schema: 
 *           type: integer
 *           default: 1
 *         description: Número de página (basado en 1)
 *         example: 1
 *       - in: query
 *         name: spaceId
 *         schema: 
 *           type: string
 *           format: uuid
 *         description: Filtrar por ID del espacio (UUID)
 *         example: "be1f7f87-1dd7-4324-93d1-8e66b35588ba"
 *       - in: query
 *         name: fullRoom
 *         schema:
 *           type: boolean
 *         description: Filtrar solo reservas con sala completa
 *         example: true
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha de inicio para filtrar las reservas
 *         example: "2025-07-01T00:00:00.000Z"
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha de fin para filtrar las reservas
 *         example: "2025-07-31T23:59:59.000Z"
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetReservationsResponse'
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: Sin permisos
 *       500:
 *         description: Error interno
 */

router.get("/", authenticateToken, asyncHandler(ctrl.handle.bind(ctrl)));

export { router as getReservationsRoutes };
