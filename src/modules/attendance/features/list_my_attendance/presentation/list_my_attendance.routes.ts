import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListMyAttendanceController } from "./list_my_attendance.controller";

const router = Router();
const controller = new ListMyAttendanceController();

/**
 * @openapi
 * /api/v1/me/attendance:
 *   get:
 *     tags: [Attendance]
 *     summary: Obtener mis asistencias
 *     description: |
 *       Permite a un empleado consultar sus propias asistencias.
 *
 *       **Filtros disponibles:**
 *       - start_date y end_date: Filtrar por rango de fechas
 *       - type: Filtrar por tipo (ENTRY o EXIT)
 *       - Paginación con page y limit
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Cantidad de registros por página
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
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [ENTRY, EXIT]
 *         description: Tipo de asistencia para filtrar
 *     responses:
 *       200:
 *         description: Lista de mis asistencias obtenida correctamente
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
 *                   example: "Mis asistencias"
 *                 data:
 *                   type: object
 *                   properties:
 *                     attendances:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           type:
 *                             type: string
 *                             enum: [ENTRY, EXIT]
 *                           date:
 *                             type: string
 *                             format: date
 *                           check_time:
 *                             type: string
 *                             format: time
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *       403:
 *         description: Solo los empleados pueden consultar sus asistencias
 *       500:
 *         description: Error interno del servidor
 */
router.get(
  "/attendance",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as listMyAttendanceRoutes };
