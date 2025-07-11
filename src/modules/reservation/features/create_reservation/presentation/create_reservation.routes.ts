// src/modules/reservation/features/create_reservation/presentation/create_reservation.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CreateReservationController } from "./create_reservation.controller";

const router = Router();
const controller = new CreateReservationController();
/**
 * @openapi
 * /api/v1/reservations:
 *   post:
 *     tags:
 *       - Reservation
 *     summary: Crear una nueva reserva
 *     description: Permite a un cliente o administrador crear una reserva para un espacio disponible.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - spaceId
 *               - startTime
 *               - endTime
 *               - people
 *             properties:
 *               spaceId:
 *                 type: string
 *                 format: uuid
 *                 example: "be1f7f87-1dd7-4324-93d1-8e66b35588ba"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-07-12T15:00:00.000Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-07-12T16:00:00.000Z"
 *               people:
 *                 type: integer
 *                 example: 8
 *               fullRoom:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Reserva creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Created
 *                 description:
 *                   type: string
 *                   example: Reservation created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     reservation_id:
 *                       type: string
 *                       format: uuid
 *                       example: "45f408e4-782b-4af3-b8b3-07db4d63c162"
 *                     codeQr:
 *                       type: string
 *                       example: "F9A3B1D2"
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           example: "22222222-2222-2222-2222-222222222222"
 *                         first_name:
 *                           type: string
 *                           example: "Ana"
 *                         last_name:
 *                           type: string
 *                           example: "Gonzales"
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: "admin@labase.com"
 *                         user_type:
 *                           type: string
 *                           enum: [client, admin]
 *       400:
 *         description: Error de validación o datos fuera de rango
 *       404:
 *         description: Espacio no encontrado
 *       409:
 *         description: Solapamiento de horarios
 *       500:
 *         description: Error interno del servidor
 */

router.post("/", authenticateToken, asyncHandler(controller.handle.bind(controller)));

export { router as createReservationRoutes };
