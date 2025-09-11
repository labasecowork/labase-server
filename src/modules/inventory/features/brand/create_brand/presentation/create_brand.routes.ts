import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { CreateBrandController } from "./create_brand.controller";

const router = Router();
const controller = new CreateBrandController();

/**
 * @openapi
 * /api/v1/product-brands:
 *   post:
 *     tags:
 *       - ProductBrand
 *     summary: Crear marca
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sony"
 *     responses:
 *       201:
 *         description: Marca creada exitosamente
 *       400:
 *         description: Error de validación
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo administradores pueden crear marcas
 *       409:
 *         description: Nombre de marca duplicado
 */
router.post(
  "/",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as createBrandRoutes };
