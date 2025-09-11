import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { AttendanceStatsController } from "./attendance_stats.controller";

const router = Router();
const controller = new AttendanceStatsController();

/**
 * @openapi
 * /api/v1/attendance/stats:
 *   get:
 *     tags: [Attendance]
 *     summary: Obtener estadísticas de asistencia (Solo Admin)
 *     description: |
 *       Permite a los administradores obtener estadísticas generales de asistencia.
 *
 *       **Estadísticas devueltas:**
 *       - total_registered_days: Número de días únicos registrados
 *       - total_records: Número total de registros de asistencia
 *       - total_hours: Total de horas trabajadas (formato "Xh Ym")
 *       - total_employees: Número total de empleados únicos
 *
 *       **Filtros disponibles:**
 *       - employee_id: Filtrar por empleado específico
 *       - start_date y end_date: Filtrar por rango de fechas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: employee_id
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del empleado para filtrar
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio para filtrar
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin para filtrar
 *     responses:
 *       200:
 *         description: Estadísticas de asistencia obtenidas correctamente
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
 *                   example: "OK"
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_registered_days:
 *                       type: integer
 *                       example: 15
 *                       description: Número de días únicos registrados
 *                     total_records:
 *                       type: integer
 *                       example: 120
 *                       description: Número total de registros de asistencia
 *                     total_hours:
 *                       type: string
 *                       example: "180h 30m"
 *                       description: Total de horas trabajadas
 *                     total_employees:
 *                       type: integer
 *                       example: 8
 *                       description: Número total de empleados únicos
 *       403:
 *         description: Solo los administradores pueden acceder
 *       500:
 *         description: Error interno del servidor
 */
router.get(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as attendanceStatsRoutes };
