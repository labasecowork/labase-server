import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListMyReservationsController } from "./list_my_reservations.controller";

const router = Router();
const controller = new ListMyReservationsController();
/**
 * @openapi
 * /api/v1/reservations/mine:
 *   get:
 *     tags:
 *       - Reservation
 *     summary: Listar mis reservas
 *     description: Devuelve las reservas del usuario autenticado, ordenadas por fecha de inicio descendente. Soporta paginación.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         example: 10
 *         description: Número máximo de resultados por página
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         example: 1
 *         description: Número de página (basado en 1)
 *     responses:
 *       200:
 *         description: Lista de reservas del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: OK
 *                 description:
 *                   type: string
 *                   example: My reservations
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Objeto de reserva
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *       401:
 *         description: Usuario no autenticado
 *       500:
 *         description: Error interno del servidor
 */
router.get(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as listMyReservationsRoutes };
