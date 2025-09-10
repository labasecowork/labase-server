//src/modules/content/article/update_article/presentation/update_article.routes.ts
import { Router } from "express";
import multer from "multer";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { UpdateArticleController } from "./update_article.controller";

const router = Router();
const controller = new UpdateArticleController();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @openapi
 * /api/v1/articles/{id}:
 *   patch:
 *     tags: [Article]
 *     summary: Update an article (only owner)
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               categoryId: { type: string, format: uuid }
 *               banner: { type: string, format: binary }
 *               content: { type: string, format: binary }
 *     responses:
 *       200: { description: Updated }
 */
router.patch(
  "/:id",
  authenticateToken,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "content", maxCount: 1 },
  ]),
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
