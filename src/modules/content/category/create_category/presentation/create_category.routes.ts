//src/modules/content/category/create_category/presentation/create_category.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { CreateCategoryController } from "./create_category.controller";

const router = Router();
const controller = new CreateCategoryController();

/**
 * @openapi
 * /api/v1/article-categories:
 *   post:
 *     tags: [ArticleCategory]
 *     summary: Create a new article category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: "Programming" }
 *               description: { type: string, example: "Tutorials and best practices" }
 *     responses:
 *       201: { description: Category created }
 */
router.post(
  "/",
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
