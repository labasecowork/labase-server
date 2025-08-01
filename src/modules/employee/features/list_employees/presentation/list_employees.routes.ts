// src/modules/employee/features/list_employees/presentation/list_employees.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListEmployeesController } from "./list_employees.controller";

const router = Router();
const controller = new ListEmployeesController();

/**
 * @openapi
 * /api/v1/employee:
 *   get:
 *     tags: [Employee]
 *     summary: Obtener todos los empleados (Solo Admin)
 *     description: |
 *       Permite a los administradores ver todos los empleados registrados.
 *
 *       **Filtros disponibles:**
 *       - status: Filtrar por estado (active, suspended, pending)
 *       - search: Buscar por nombre, apellido o email
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
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, suspended, pending]
 *         description: Estado del empleado para filtrar
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nombre, apellido o email
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida correctamente
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
 *                     employees:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           employee_id:
 *                             type: string
 *                           user:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               first_name:
 *                                 type: string
 *                               last_name:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                               user_type:
 *                                 type: string
 *                                 enum: [admin, client]
 *                               profile_image:
 *                                 type: string
 *                               phone:
 *                                 type: string
 *                               birth_date:
 *                                 type: string
 *                                 format: date
 *                               gender:
 *                                 type: string
 *                               status:
 *                                 type: string
 *                                 enum: [active, suspended, pending]
 *                               creation_timestamp:
 *                                 type: string
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
 *         description: Solo los administradores pueden acceder
 *       500:
 *         description: Error interno del servidor
 */
router.get(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as listEmployeesRoutes };
