// src/modules/employee/features/activate_employee/presentation/activate_employee.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ActivateEmployeeController } from "./activate_employee.controller";

const router = Router();
const controller = new ActivateEmployeeController();

/**
 * @openapi
 * /api/v1/employee/{id}/activate:
 *   patch:
 *     tags: [Employee]
 *     summary: Activar un empleado (Solo Admin)
 *     description: |
 *       Permite a los administradores activar la cuenta de un empleado que estaba desactivado.
 *
 *       **Características:**
 *       - Solo administradores pueden activar empleados
 *       - Cambia el status del empleado a "active"
 *       - El empleado podrá iniciar sesión nuevamente
 *       - No se puede activar un empleado que ya está activo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del empleado a activar
 *         example: "bd0e5dc3-95ca-473c-9ec4-89f05068a259"
 *     responses:
 *       200:
 *         description: Empleado activado correctamente
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
 *                   example: "Empleado activado exitosamente"
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
 *                         first_name:
 *                           type: string
 *                         last_name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         status:
 *                           type: string
 *                           example: "active"
 *       400:
 *         description: Error de validación o empleado ya activo
 *       403:
 *         description: Solo administradores pueden activar empleados
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch(
  "/:id/activate",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as activateEmployeeRoutes };
