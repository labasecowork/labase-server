//src/modules/employee/features/create_config/presentation/create_config.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CreateEmployeeConfigController } from "./create_config.controller";

const router = Router();
const controller = new CreateEmployeeConfigController();

/**
 * @openapi
 * /api/v1/employee-config:
 *   post:
 *     tags: [Employee Config]
 *     summary: Crear/actualizar configuración de asistencia (policy + schedules)
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Configuración creada/actualizada
 *       403:
 *         description: Solo administradores
 */
router.post(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as createEmployeeConfigRoutes };
