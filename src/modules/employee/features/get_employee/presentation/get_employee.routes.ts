import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { GetEmployeeController } from "./get_employee.controller";

const router = Router();
const controller = new GetEmployeeController();

/**
 * @openapi
 * /api/v1/employee/{id}:
 *   get:
 *     tags: [Employee]
 *     summary: Obtener información de un empleado específico (Solo Admin)
 *     description: |
 *       Permite a los administradores obtener la información detallada de un empleado específico por su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único del empleado
 *     responses:
 *       200:
 *         description: Información del empleado obtenida correctamente
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
 *                     employee_id:
 *                       type: string
 *                       format: uuid
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                         first_name:
 *                           type: string
 *                         last_name:
 *                           type: string
 *                         email:
 *                           type: string
 *                           format: email
 *                         user_type:
 *                           type: string
 *                           enum: [admin, client]
 *                         profile_qimage:
 *                           type: string
 *                           nullable: true
 *                         phone:
 *                           type: string
 *                           nullable: true
 *                         birth_date:
 *                           type: string
 *                           format: date
 *                           nullable: true
 *                         gender:
 *                           type: string
 *                           enum: [male, female, unspecified]
 *                           description: Género del usuario
 *                         status:
 *                           type: string
 *                           enum: [active, suspended, pending]
 *                         creation_timestamp:
 *                           type: string
 *                           nullable: true
 *       400:
 *         description: ID del empleado inválido
 *       403:
 *         description: Solo los administradores pueden acceder
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller)),
);

export { router as getEmployeeRoutes };
