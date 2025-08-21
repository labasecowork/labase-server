// src/modules/space/features/list_spaces/list_activated_spaces/presentation/routes/list_activated_spaces.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { ListActivatedSpacesController } from "./list_activated_spaces.controller";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";

const router = Router();
const controller = new ListActivatedSpacesController();

/**
 * @openapi
 * /api/v1/spaces:
 *   get:
 *     tags:
 *       - Space
 *     summary: Listar todos los espacios ACTIVOS
 *     description: >
 *       Filtra por tipo, capacidad y disponibilidad (por defecto, activos).
 *     parameters:
 *       - name: type
 *         in: query
 *         schema:
 *           type: string
 *           enum: [UNIT, SHARED_SITE, FULL_ROOM]
 *       - name: capacity
 *         in: query
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - name: available
 *         in: query
 *         schema:
 *           type: boolean
 *           default: true
 *     responses:
 *       200:
 *         description: Lista filtrada de espacios activos
 *       400:
 *         description: Error de validación
 *       401:
 *         description: Token inválido o ausente
 *       500:
 *         description: Error del servidor
 */
router.get(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller)),
);

export { router as listActivatedSpacesRoutes };
