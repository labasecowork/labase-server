import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { DeactivateEmployeeController } from "./deactivate_employee.controller";

const router = Router();
const controller = new DeactivateEmployeeController();

/**
 * @openapi
 * /api/v1/employee/{id}:
 *   delete:
 *     tags: [Employee]
 *     summary: Desactivar un empleado (Solo Admin)
 *     description: |
 *       Permite a los administradores desactivar la cuenta de un empleado.
 *
 *       **Características:**
 *       - Solo administradores pueden desactivar empleados
 *       - Cambia el status del empleado a "suspended"
 *       - No elimina físicamente los datos
 *       - El empleado no podrá iniciar sesión mientras esté desactivado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del empleado a desactivar
 *         example: "bd0e5dc3-95ca-473c-9ec4-89f05068a259"
 *     responses:
 *       200:
 *         description: Empleado desactivado correctamente
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
 *                   example: "Empleado desactivado exitosamente"
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
 *                           example: "suspended"
 *       400:
 *         description: Error de validación o empleado ya desactivado
 *       403:
 *         description: Solo administradores pueden desactivar empleados
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as deactivateEmployeeRoutes };
