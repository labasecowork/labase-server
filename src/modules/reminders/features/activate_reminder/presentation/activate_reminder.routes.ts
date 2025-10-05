import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { ActivateReminderController } from "./activate_reminder.controller";

const router = Router();
const controller = new ActivateReminderController();

/**
 * @openapi
 * /api/v1/reminders/{id}/activate:
 *   patch:
 *     tags: [Reminders]
 *     summary: Activate a reminder
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del recordatorio
 *     responses:
 *       200:
 *         description: Recordatorio activado exitosamente
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
 *                   example: "Recordatorio activado exitosamente"
 *                 path:
 *                   type: string
 *                   example: "/api/v1/reminders/123e4567-e89b-12d3-a456-426614174000/activate"
 *                 data:
 *                   type: null
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Recordatorio no encontrado
 */
router.patch(
  "/activate/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
