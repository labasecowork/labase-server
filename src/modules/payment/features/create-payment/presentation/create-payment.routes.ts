// src/modules/payment/features/create-payment/presentation/create-payment.route.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CreatePaymentController } from "./create-payment.controller";

const router = Router();
const ctrl = new CreatePaymentController();
/**
 * @openapi
 * /payment/create-payment:
 *   post:
 *     tags: [Payment]
 *     summary: Inicia un nuevo flujo de pago
 *     description: Genera un `purchaseNumber`, solicita `accessToken` y `sessionToken`, y devuelve la URL del script de checkout.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - purchaseNumber
 *               - amount
 *               - currency
 *               - reservationId
 *             properties:
 *               purchaseNumber:
 *                 type: string
 *               amount:
 *                 type: number
 *                 format: float
 *               currency:
 *                 type: string
 *                 description: ISO 4217, e.g. “PEN”
 *               reservationId:
 *                 type: string
 *                 description: UUID de la reserva asociada
 *               userId:
 *                 type: string
 *                 description: (Opcional) UUID del usuario
 *               metadata:
 *                 $ref: '#/components/schemas/PaymentMetadata'
 *     responses:
 *       200:
 *         description: Flujo iniciado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreatePaymentResponse'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno
 */

router.post(
  "/",
  authenticateToken,
  asyncHandler(ctrl.handle.bind(ctrl))
);

export { router as createPaymentRoutes };