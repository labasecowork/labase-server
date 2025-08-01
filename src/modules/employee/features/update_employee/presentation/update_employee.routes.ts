// src/modules/employee/features/update_employee/presentation/update_employee.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { UpdateEmployeeController } from "./update_employee.controller";

const router = Router();
const controller = new UpdateEmployeeController();

/**
 * @openapi
 * /api/v1/employee/{id}:
 *   patch:
 *     tags: [Employee]
 *     summary: Actualizar un empleado (Solo Admin)
 *     description: |
 *       Permite a los administradores actualizar los datos de un empleado existente.
 *
 *       **Características:**
 *       - Solo administradores pueden actualizar empleados
 *       - Actualización parcial (todos los campos son opcionales)
 *       - El email debe ser único si se actualiza
 *       - La contraseña se hashea automáticamente si se proporciona
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del empleado a actualizar
 *         example: "bd0e5dc3-95ca-473c-9ec4-89f05068a259"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Nombre del empleado
 *                 example: "Juan"
 *               last_name:
 *                 type: string
 *                 description: Apellido del empleado
 *                 example: "Pérez"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email único del empleado
 *                 example: "juan.perez@empresa.com"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Nueva contraseña (mínimo 6 caracteres)
 *               user_type:
 *                 type: string
 *                 enum: [admin, client]
 *                 description: Tipo de usuario
 *               profile_image:
 *                 type: string
 *                 format: uri
 *                 description: URL de imagen de perfil
 *               phone:
 *                 type: string
 *                 description: Número telefónico
 *                 example: "+1234567890"
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento
 *                 example: "1990-01-15"
 *               gender:
 *                 type: string
 *                 description: Género
 *                 example: "Masculino"
 *               status:
 *                 type: string
 *                 enum: [active, suspended, pending]
 *                 description: Estado del empleado
 *     responses:
 *       200:
 *         description: Empleado actualizado correctamente
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
 *                   example: "Empleado actualizado exitosamente"
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
 *                         user_type:
 *                           type: string
 *                           enum: [admin, client]
 *                         status:
 *                           type: string
 *                           enum: [active, suspended, pending]
 *       400:
 *         description: Error de validación
 *       403:
 *         description: Solo administradores pueden actualizar empleados
 *       404:
 *         description: Empleado no encontrado
 *       409:
 *         description: Ya existe otro usuario con este email
 *       500:
 *         description: Error interno del servidor
 */
router.patch(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as updateEmployeeRoutes };
