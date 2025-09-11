import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListAllAttendanceController } from "./list_all_attendance.controller";

const router = Router();
const controller = new ListAllAttendanceController();

/**
 * @openapi
 * /api/v1/attendance:
 *   get:
 *     tags: [Attendance]
 *     summary: Obtener todas las asistencias (Solo Admin)
 *     description: |
 *       Permite a los administradores ver todas las asistencias de todos los empleados.
 *
 *       **Filtros disponibles:**
 *       - employee_id: Filtrar por empleado específico
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
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [entry, exit]
 *         description: Tipo de asistencia para filtrar
 *     responses:
 *       200:
 *         description: Lista de asistencias obtenida correctamente
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
 *                     attendances:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           employee_id:
 *                             type: string
 *                           type:
 *                             type: string
 *                             enum: [entry, exit]
 *                           date:
 *                             type: string
 *                             format: date
 *                           check_time:
 *                             type: string
 *                             format: time
 *                           employee:
 *                             type: object
 *                             properties:
 *                               employee_id:
 *                                 type: string
 *                               user:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                                   email:
 *                                     type: string
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         total_pages:
 *                           type: integer
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

export { router as listAllAttendanceRoutes };
