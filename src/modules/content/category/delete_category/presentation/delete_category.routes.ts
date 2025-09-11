import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { DeleteCategoryController } from "./delete_category.controller";

const router = Router();
const controller = new DeleteCategoryController();

/**
 * @openapi
 * /api/v1/article-categories/{id}:
 *   delete:
 *     tags: [ArticleCategory]
 *     summary: Delete a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Category deleted }
 *       404: { description: Category not found }
 */
router.delete(
  "/:id",
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
