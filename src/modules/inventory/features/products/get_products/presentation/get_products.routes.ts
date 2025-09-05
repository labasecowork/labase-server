// src/modules/product/features/get_products/presentation/get_products.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { GetProductsController } from "./get_products.controller";

const router = Router();
const controller = new GetProductsController();

/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     tags:
 *       - Product
 *     summary: Listar productos
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, example: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, example: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string, example: "laptop" }
 *       - in: query
 *         name: brand_id
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: brand_name
 *         schema: { type: string, example: "Lenovo" }
 *     responses:
 *       200:
 *         description: Lista paginada de productos
 */
router.get("/", asyncHandler(controller.getAll.bind(controller)));

/**
 * @openapi
 * /api/v1/products/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Detalle de producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Detalle de producto
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", asyncHandler(controller.getOne.bind(controller)));

export { router as getProductsRoutes };
