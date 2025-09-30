//src/modules/employee/features/update_config/presentation/update_config.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { UpdateEmployeeConfigController } from "./update_config.controller";

const router = Router();
const controller = new UpdateEmployeeConfigController();

/**
 * @openapi
 * /api/v1/employee-config/{employee_id}:
 *   patch:
 *     tags: [Employee Config]
 *     summary: Actualizar configuración de asistencia (parcial)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Configuración actualizada }
 *       403: { description: Solo administradores }
 */
router.patch(
  "/:employee_id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as updateEmployeeConfigRoutes };
