import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { DeleteArticleController } from "./delete_article.controller";

const router = Router();
const controller = new DeleteArticleController();

/**
 * @openapi
 * /api/v1/articles/{id}:
 *   delete:
 *     tags: [Article]
 *     summary: Delete an article (only owner)
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200: { description: Deleted }
 *       401: { description: Unauthorized }
 */
router.delete(
  "/:id",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
