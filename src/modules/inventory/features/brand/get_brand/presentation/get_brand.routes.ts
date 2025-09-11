import { Router } from "express";
import { asyncHandler } from "../../../../../../middlewares/async_handler";
import { GetBrandController } from "./get_brand.controller";

const router = Router();
const controller = new GetBrandController();

/**
 * @openapi
 * /api/v1/product/brands:
 *   get:
 *     tags:
 *       - ProductBrand
 *     summary: Get all brands
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string, example: "Lenovo" }
 *     responses:
 *       200:
 *         description: Brand list
 */
router.get("/", asyncHandler(controller.getAll.bind(controller)));

/**
 * @openapi
 * /api/v1/product/brands/{id}:
 *   get:
 *     tags:
 *       - ProductBrand
 *     summary: Get brand detail
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Brand detail
 *       404:
 *         description: Brand not found
 */
router.get("/:id", asyncHandler(controller.getOne.bind(controller)));

export { router as getBrandRoutes };
