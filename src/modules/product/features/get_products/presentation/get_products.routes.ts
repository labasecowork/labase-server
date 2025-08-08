// src/modules/product/features/get_products/presentation/get_products.routes.ts
import { Router } from "express";
import { getProducts, getProductById } from "./get_products.controller";

const router = Router();

/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     tags:
 *       - Product
 *     summary: Obtener lista de productos o detalle por query param
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Si se proporciona, devuelve el detalle del producto
 *     responses:
 *       200:
 *         description: Lista de productos o detalle del producto
 *       404:
 *         description: Producto no encontrado
 */
router.get("/", getProducts);

/**
 * @openapi
 * /api/v1/products/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Obtener detalle de un producto (RESTful)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto (UUID)
 *     responses:
 *       200:
 *         description: Detalle del producto
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", getProductById);

export { router as getProductsRoutes };
