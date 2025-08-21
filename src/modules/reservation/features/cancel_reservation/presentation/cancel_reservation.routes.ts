// src/modules/reservation/features/cancel_reservation/presentation/cancel_reservation.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CancelReservationController } from "./cancel_reservation.controller";

const router = Router({ mergeParams: true });
const controller = new CancelReservationController();

/**
 * @openapi
 * /api/v1/reservations/{id}/cancel:
 *   patch:
 *     tags: [Reservation]
 *     summary: Cancelar una reserva
 *     description: |
 *       Reglas:
 *       - Admin puede cancelar cualquier reserva.
 *       - Cliente solo puede cancelar su propia reserva.
 *       - Estados permitidos para cancelar: **PENDING** o **CONFIRMED**.
 *       - No se puede cancelar si está **IN_PROGRESS** o ya **CANCELLED**.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: "Cambio de planes"
 *     responses:
 *       200:
 *         description: Reserva cancelada correctamente
 *       403:
 *         description: No autorizado para cancelar esta reserva
 *       404:
 *         description: Reserva no encontrada
 *       409:
 *         description: Estado no válido para cancelar
 *       500:
 *         description: Error interno del servidor
 */
router.patch(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller)),
);

export { router as cancelReservationRoutes };
