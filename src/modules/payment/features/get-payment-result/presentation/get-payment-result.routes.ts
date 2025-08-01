// src/modules/payment/features/get-payment-result/presentation/get-payment-result.route.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { GetPaymentResultController } from "./get-payment-result.controller";

const router = Router();
const ctrl = new GetPaymentResultController();

/**
 * @openapi
 * /payment/result/{purchaseNumber}:
 *   get:
 *     tags: [Payment]
 *     summary: Consulta el estado de una transacción
 *     description: Devuelve el estado y detalles de la transacción por `purchaseNumber`.
 *     parameters:
 *       - in: path
 *         name: purchaseNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de compra generado por `/create-payment`
 *         example: ORDER-12345
 *     responses:
 *       200:
 *         description: Estado de la transacción
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResultResponse'
 *       404:
 *         description: Transacción no encontrada
 *       500:
 *         description: Error interno
 */

router.get(
  "/:purchaseNumber",
  asyncHandler(ctrl.handle.bind(ctrl))
);

export { router as resultRoutes };
