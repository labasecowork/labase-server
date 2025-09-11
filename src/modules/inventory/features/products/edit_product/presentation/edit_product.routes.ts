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
 *   put:
 *     tags:
 *       - Product
 *     summary: Editar producto
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
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 format: JSON
 *                 example: '{"name":"Producto A","brand_id":"6e9e4f3a-0d3f-4d8b-8f23-1a2b3c4d5e6f","quantity":15,"unit_of_measure":"kilogram"}'
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       400:
 *         description: Error de validación o marca inválida
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo administradores pueden editar
 *       404:
 *         description: Producto no encontrado
 */
router.put(
  "/:id",
  authenticateToken,
  upload.array("images", 1),
  asyncHandler(controller.handle.bind(controller))
);

export { router as editProductRoutes };
