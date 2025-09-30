//src/modules/employee/features/get_config/presentation/get_config.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { GetEmployeeConfigController } from "./get_config.controller";

const router = Router();
const controller = new GetEmployeeConfigController();

/**
 * @openapi
 * /api/v1/employee-config/{employee_id}:
 *   get:
 *     tags: [Employee Config]
 *     summary: Obtener configuración de asistencia (policy + schedules)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Configuración devuelta }
 *       403: { description: No autorizado }
 *       404: { description: Empleado no existe }
 */
router.get(
  "/:employee_id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as getEmployeeConfigRoutes };
