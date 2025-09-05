// src/modules/product/features/create_product/presentation/routes/create_product.routes.ts
import { Router } from "express";
import { DeleteProductController } from "./delete_product.controller";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../../middlewares/async_handler";

const router = Router();
const controller = new DeleteProductController();

/**
 * @openapi
 * /api/v1/products/{id}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Eliminar un producto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo administradores pueden eliminar
 *       404:
 *         description: Producto no encontrado
 */
router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller)),
);

export { router as deleteProductRoutes };
