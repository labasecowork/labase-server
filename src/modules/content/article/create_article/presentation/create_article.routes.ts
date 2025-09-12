import { Router } from "express";
import multer from "multer";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { CreateArticleController } from "./create_article.controller";

const router = Router();
const controller = new CreateArticleController();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @openapi
 * /api/v1/articles:
 *   post:
 *     tags: [Article]
 *     summary: Create a new article
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, categoryId, banner, content]
 *             properties:
 *               title: { type: string }
 *               categoryId: { type: string, format: uuid }
 *               banner: { type: string, format: binary }
 *               content: { type: string, format: binary }
 *     responses:
 *       201: { description: Article created }
 */
router.post(
  "/",
  authenticateToken,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "content", maxCount: 1 },
  ]),
  asyncHandler((req, res) => controller.handle(req, res))
);

export default router;
