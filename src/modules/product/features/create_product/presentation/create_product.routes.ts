// src/modules/product/features/create_product/presentation/routes/create_product.routes.ts
import { Router } from "express";
import multer from "multer";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CreateProductController } from "./create_product.controller";

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();
const controller = new CreateProductController();
/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     tags:
 *       - Product
 *     summary: Crear un nuevo producto
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
 *                 example: '{"name":"Producto A","brand":"Marca Z","quantity":10,"unit_of_measure":"unit"}'
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo administradores pueden crear productos
 */

router.post(
  "/",
  authenticateToken,
  upload.array("images", 1),
  asyncHandler(controller.handle.bind(controller))
);

export { router as createProductRoutes };
