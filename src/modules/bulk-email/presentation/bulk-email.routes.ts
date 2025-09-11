import { Router } from "express";
import { authenticateToken } from "../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../middlewares/async_handler";
import { EmailController } from "./bulk-email.controller";

const router = Router();
const controller = new EmailController();
/**
 * @openapi
 * /api/v1/bulk-email:
 *   post:
 *     tags:
 *       - Email
 *     summary: Enviar correo masivo
 *     description: Envía un correo masivo únicamente a suscriptores del newsletter de LaBase. Solo administradores pueden ejecutar esta acción.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - text
 *             properties:
 *               subject:
 *                 type: string
 *                 example: "Comunidad LaBase - Actualizaciones semanales"
 *               text:
 *                 type: string
 *                 example: "Hola, esta semana lanzamos nuevas funcionalidades. Entra para verlas."
 *               html:
 *                 type: string
 *                 example: "<h2>¡LaBase se actualiza!</h2><p>Haz clic <a href='https://labase.dev'>aquí</a> para conocer más.</p>"
 *     responses:
 *       200:
 *         description: "Correos enviados exitosamente"
 *       400:
 *         description: "Error de validación"
 *       401:
 *         description: "Token inválido o ausente"
 *       403:
 *         description: "Acceso denegado: solo administradores"
 *       500:
 *         description: "Fallo inesperado al enviar correos"
 */

router.post(
  "/",
  authenticateToken,
  asyncHandler(controller.sendBulkEmail.bind(controller))
);

export { router as bulkEmailRoutes };
