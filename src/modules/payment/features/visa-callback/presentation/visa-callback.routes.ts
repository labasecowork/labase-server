// src/modules/payment/features/visa-callback/presentation/visa-callback.route.ts
import { Router } from "express";
import express from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { VisaCallbackController } from "./visa-callback.controller";

const router = Router();
const ctrl = new VisaCallbackController();
/**
 * @openapi
 * /payment/visa-callback:
 *   post:
 *     tags:
 *       - Payment
 *     summary: Callback de Niubiz tras el pago
 *     description: Valida el transactionToken con Niubiz y guarda el resultado en BD.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               purchaseNumber:
 *                 type: string
 *                 description: Número de compra generado en create-payment
 *               tokenId::
 *                 type: string
 *                 description: Token retornado por el formulario de Niubiz
 *             required:
 *               - purchaseNumber
 *               - transactionToken
 *     responses:
 *       302:
 *         description: "Redirige al frontend para finalizar la reserva"
 *         headers:
 *           Location:
 *             description: "URL de redirección con purchaseNumber"
 *             schema:
 *               type: string
 *       400:
 *         description: "transactionToken o purchaseNumber inválido"
 *       500:
 *         description: "Error interno del servidor"
 */
router.post(
  "/",
  express.urlencoded({ extended: false}),
  asyncHandler(ctrl.handle.bind(ctrl))
);


export { router as visaCbRoutes };
