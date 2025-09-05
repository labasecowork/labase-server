// src/modules/product/feature/edit_product/presentation/edit_product.routes.ts
import { Router } from "express";
import multer from "multer";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { EditProductController } from "./edit_product.controller";

const router = Router();
const controller = new EditProductController();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @openapi
 * /api/v1/products/{id}:
 *   patch:
 *     tags:
 *       - Product
 *     summary: Actualizar producto parcialmente
 *     description: Actualiza solo los campos enviados del producto. Todos los campos son opcionales.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 format: JSON
 *                 description: Datos del producto en formato JSON. Todos los campos son opcionales.
 *                 example: '{"name":"Producto A actualizado","quantity":20}'
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Nueva imagen del producto (opcional)
 *     responses:
 *       200:
 *         description: Producto actualizado parcialmente
 *       400:
 *         description: Error de validación o marca inválida
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo administradores pueden editar
 *       404:
 *         description: Producto no encontrado
 */
router.patch(
  "/:id",
  authenticateToken,
  upload.array("images", 1),
  asyncHandler(controller.handle.bind(controller))
);

export { router as editProductRoutes };
