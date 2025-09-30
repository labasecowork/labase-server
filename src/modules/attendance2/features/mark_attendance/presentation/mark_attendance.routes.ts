// src/modules/attendance/features/mark_attendance/presentation/mark_attendance.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { MarkAttendanceController } from "./mark_attendance.controller";

const router = Router();
const controller = new MarkAttendanceController();

/**
 * @openapi
 * /api/v1/attendance:
 *   post:
 *     tags: [Attendance]
 *     summary: Marcar asistencia (entrada o salida)
 *     description: |
 *       Permite a un empleado marcar su entrada o salida.
 *
 *       **Validaciones:**
 *       - Solo empleados registrados pueden marcar asistencia
 *       - No se puede marcar entrada después de entrada (debe ser salida primero)
 *       - No se puede marcar salida después de salida (debe ser entrada primero)
 *       - La nueva entrada debe ser posterior a la última salida
 *       - La primera marca debe ser una entrada
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type]
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [ENTRY, EXIT]
 *                 description: Tipo de asistencia - ENTRY para entrada, EXIT para salida
 *                 example: ENTRY
 *     responses:
 *       201:
 *         description: Asistencia marcada correctamente
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
 *                   example: "Asistencia marcada exitosamente: Entrada"
 *                 data:
 *                   type: object
 *                   properties:
 *                     attendance_id:
 *                       type: string
 *                       format: uuid
 *                     type:
 *                       type: string
 *                       enum: [ENTRY, EXIT]
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2024-01-15"
 *                     check_time:
 *                       type: string
 *                       format: time
 *                       example: "08:30:00"
 *                     user:
 *                       $ref: '#/components/schemas/UserInfo'
 *       400:
 *         description: Error de validación o reglas de negocio
 *       403:
 *         description: Solo empleados pueden marcar asistencia
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as markAttendanceRoutes };
