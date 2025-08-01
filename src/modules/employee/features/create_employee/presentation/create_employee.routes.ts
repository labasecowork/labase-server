// src/modules/employee/features/create_employee/presentation/create_employee.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CreateEmployeeController } from "./create_employee.controller";

const router = Router();
const controller = new CreateEmployeeController();

/**
 * @openapi
 * /api/v1/employee:
 *   post:
 *     tags: [Employee]
 *     summary: Crear un nuevo empleado (Solo Admin)
 *     description: |
 *       Permite a los administradores crear una nueva cuenta de empleado.
 *
 *       **Características:**
 *       - Solo administradores pueden crear empleados
 *       - Se crea un usuario y su registro de empleado
 *       - El email debe ser único en el sistema
 *       - La contraseña se hashea automáticamente
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [first_name, last_name, email, password]
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
 *                 description: Contraseña (mínimo 6 caracteres)
 *                 example: "password123"
 *               user_type:
 *                 type: string
 *                 enum: [admin, client]
 *                 default: client
 *                 description: Tipo de usuario
 *               profile_image:
 *                 type: string
 *                 format: uri
 *                 description: URL de imagen de perfil (opcional)
 *               phone:
 *                 type: string
 *                 description: Número telefónico (opcional)
 *                 example: "+1234567890"
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento (opcional)
 *                 example: "1990-01-15"
 *               gender:
 *                 type: string
 *                 description: Género (opcional)
 *                 example: "Masculino"
 *     responses:
 *       201:
 *         description: Empleado creado correctamente
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
 *                   example: "Empleado creado exitosamente"
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
 *         description: Solo administradores pueden crear empleados
 *       409:
 *         description: Ya existe un usuario con este email
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as createEmployeeRoutes };
