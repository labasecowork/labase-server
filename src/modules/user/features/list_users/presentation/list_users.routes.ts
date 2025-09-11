import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { ListUsersController } from "./list_users.controller";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";

const router = Router();
const controller = new ListUsersController();

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags:
 *       - User
 *     summary: Listar usuarios con filtros
 *     description: >
 *       Filtra por tipo de usuario y estado.
 *       Por defecto muestra usuarios activos, pero puede filtrar por otros estados o todos.
 *       Solo devuelve ID, nombre y apellido de cada usuario.
 *     parameters:
 *       - name: user_type
 *         in: query
 *         schema:
 *           type: string
 *           enum: [admin, client, employee]
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *           enum: [active, suspended, pending, all]
 *           default: active
 *         description: Estado del usuario
 *     responses:
 *       200:
 *         description: Lista filtrada de usuarios según los criterios especificados
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

export { router as listUsersRoutes };
