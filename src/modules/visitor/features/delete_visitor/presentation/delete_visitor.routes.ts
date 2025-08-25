// src/modules/visitor/features/delete_visitor/presentation/delete_visitor.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { DeleteVisitorController } from "./delete_visitor.controller";

const router = Router();
const controller = new DeleteVisitorController();

/**
 * @openapi
 * /api/v1/visitors/{id}:
 *   delete:
 *     tags: [Visitor]
 *     summary: Eliminar un visitante
 *     description: |
 *       Elimina un registro de visitante. Solo **admin**.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del visitante a eliminar
 *     responses:
 *       200:
 *         description: Visitante eliminado correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado para eliminar
 *       404:
 *         description: Visitante no encontrado
 */
router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller)),
);

export { router as deleteVisitorRoutes };
