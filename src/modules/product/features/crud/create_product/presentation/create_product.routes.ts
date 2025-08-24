// src/modules/product/features/crud/create_product/presentation/routes/create_product.routes.ts
import { Router } from "express";
import multer from "multer";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { CreateProductController } from "./create_product.controller";

const router = Router();
const controller = new CreateProductController();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     tags:
 *       - Product
 *     summary: Crear producto
 *     security:
 *       - bearerAuth: []
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
 *                 example: '{"name":"Mouse Pro","brand_id":"6e9e4f3a-0d3f-4d8b-8f23-1a2b3c4d5e6f","quantity":10,"unit_of_measure":"unit","description":"Inalámbrico"}'
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: Error de validación o marca inválida
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo admins
 */
router.post(
  "/",
  authenticateToken,
  upload.array("images", 1),
  asyncHandler(controller.handle.bind(controller)),
);

export { router as createProductRoutes };
