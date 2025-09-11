import { Router } from "express";
import { DeleteBrandController } from "./delete_brand.controller";
import { authenticateToken } from "../../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../../middlewares/async_handler";

const router = Router();
const controller = new DeleteBrandController();

/**
 * @openapi
 * /api/v1/product-brands/{id}:
 *   delete:
 *     tags:
 *       - ProductBrand
 *     summary: Delete brand
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Brand ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only administrators can delete brands
 *       404:
 *         description: Brand not found
 *       409:
 *         description: Brand has associated products
 */
router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller)),
);

export { router as deleteBrandRoutes };
