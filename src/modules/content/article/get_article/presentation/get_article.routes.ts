import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { GetArticleController } from "./get_article.controller";

const router = Router();
const controller = new GetArticleController();

/**
 * @openapi
 * /api/v1/articles:
 *   get:
 *     tags: [Article]
 *     summary: List all articles (paginated)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, default: 10 }
 *     responses:
 *       200: { description: Paginated list }
 *
 * /api/v1/articles/{id}:
 *   get:
 *     tags: [Article]
 *     summary: Get article by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Article found }
 *       404: { description: Not found }
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
