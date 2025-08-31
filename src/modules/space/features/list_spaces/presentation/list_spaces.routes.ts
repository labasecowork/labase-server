// src/modules/space/features/list_spaces/list_activated_spaces/presentation/routes/list_activated_spaces.routes.ts
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
 *     summary: Listar espacios con filtros de estado
 *     description: >
 *       Filtra por tipo, capacidad, disponibilidad y estado de activación.
 *       Por defecto muestra espacios activos, pero puede filtrar por inactivos o todos.
 *     parameters:
 *       - name: type
 *         in: query
 *         schema:
 *           type: string
 *           enum: [unit, shared_site, full_room]
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
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *           enum: [active, inactive, all]
 *           default: active
 *         description: Estado de activación de los espacios
 *     responses:
 *       200:
 *         description: Lista filtrada de espacios según los criterios especificados
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
  asyncHandler(controller.handle.bind(controller))
);

export { router as listSpacesRoutes };
