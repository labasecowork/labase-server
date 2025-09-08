//src/modules/content/category/get_category/presentation/get_category.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { GetCategoryController } from "./get_category.controller";

const router = Router();
const controller = new GetCategoryController();

/**
 * @openapi
 * /api/v1/article-categories:
 *   get:
 *     tags: [ArticleCategory]
 *     summary: List all article categories
 *     responses:
 *       200: { description: List of categories }
 *
 * /api/v1/article-categories/{id}:
 *   get:
 *     tags: [ArticleCategory]
 *     summary: Get category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Category found }
 *       404: { description: Category not found }
 */
router.get(
  "/",
  asyncHandler((req, res) => controller.list(req, res))
);
router.get(
  "/:id",
  asyncHandler((req, res) => controller.getById(req, res))
);

export default router;
