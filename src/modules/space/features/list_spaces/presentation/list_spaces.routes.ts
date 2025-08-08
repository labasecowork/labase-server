// src/modules/space/features/list_spaces/presentation/routes/list_spaces.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { ListSpacesController } from "./list_spaces.controller";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";

const router = Router();
const controller = new ListSpacesController();
/**
 * @openapi
 * /api/v1/spaces:
 *   get:
 *     tags:
 *       - Space
 *     summary: Listar todos los espacios disponibles
 *     description: Filtra por tipo, capacidad y disponibilidad.
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
 *     responses:
 *       200:
 *         description: Lista filtrada
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error del servidor
 */

router.get(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as listSpacesRoutes };
