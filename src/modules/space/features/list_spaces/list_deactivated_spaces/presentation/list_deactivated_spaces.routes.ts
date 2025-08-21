// src/modules/space/features/list_spaces/presentation/routes/list_deactivated_spaces.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { ListDeactivatedSpacesController } from "./list_deactivated_spaces.controller";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";

const router = Router();
const controller = new ListDeactivatedSpacesController();

/**
 * @openapi
 * /api/v1/spaces/deactivated:
 *   get:
 *     tags:
 *       - Space
 *     summary: Listar todos los espacios desactivados
 *     description: >
 *       Devuelve únicamente los espacios que tienen disabled: true.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de espacios desactivados
 *       401:
 *         description: Token inválido o ausente
 *       500:
 *         description: Error interno del servidor
 */
router.get(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller)),
);
export { router as listDeactivatedSpacesRoutes };
