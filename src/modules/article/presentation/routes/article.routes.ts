// src/modules/article/presentation/routes/article.routes.ts
import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";
import { asyncHandler } from "../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../middlewares/authenticate_token";
import multer from "multer";

const router = Router();
const ctrl = new ArticleController();
const upload = multer({ storage: multer.memoryStorage() });
/**
 * @openapi
 * tags:
 *   - name: Article
 *     description: CRUD for articles (with banner & content files)
 *
 * /api/v1/articles:
 *   post:
 *     tags: [Article]
 *     summary: Create a new article
 *     description: |
 *       Requires an authenticated (active) user.  
 *       Payload is **multipart/form-data** with two files:
 *         • `banner` (image) – 1 file  
 *         • `content` (HTML/Markdown) – 1 file
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, categoryId, banner, content]
 *             properties:
 *               title:
 *                 type: string
 *                 example: My first article
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *                 example: 0f0f9c98-3a7d-4cbe-a4f0-0f3fc33a4fd2
 *               banner:
 *                 type: string
 *                 format: binary
 *               content:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Article created
 *
 *   get:
 *     tags: [Article]
 *     summary: List all articles (paginated)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated list
 *
 * /api/v1/articles/{id}:
 *   get:
 *     tags: [Article]
 *     summary: Get article by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Article found
 *       404:
 *         description: Not found
 *
 *   patch:
 *     tags: [Article]
 *     summary: Update an article (only owner)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *               banner:
 *                 type: string
 *                 format: binary
 *               content:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     tags: [Article]
 *     summary: Delete an article (only owner)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Deleted
 *       401:
 *         description: Unauthorized
 */

router.post(
  "/",
  authenticateToken,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "content", maxCount: 1 },
  ]),
  asyncHandler((req, res) => ctrl.create(req, res))
);

router.get("/", asyncHandler((req, res) => ctrl.getAll(req, res)));

router.get("/:id", asyncHandler((req, res) => ctrl.getById(req, res)));

router.patch(
  "/:id",
  authenticateToken,
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "content", maxCount: 1 },
  ]),
  asyncHandler((req, res) => ctrl.update(req, res))
);

router.delete(
  "/:id",
  authenticateToken,
  asyncHandler((req, res) => ctrl.delete(req, res))
);

export default router;
