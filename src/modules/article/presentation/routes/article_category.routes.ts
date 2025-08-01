// src/modules/article/presentation/routes/article_category.routes.ts
import { Router } from "express";
import { ArticleCategoryController } from "../controllers/article_category.controller";
import { asyncHandler } from "../../../../middlewares/async_handler";

const router = Router();
const ctrl = new ArticleCategoryController();
/**
 * @openapi
 * tags:
 *   - name: ArticleCategory
 *     description: Article categories (create, list, update, delete)
 *
 * /api/v1/articles/categories:
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
 *               name:
 *                 type: string
 *                 example: Programming
 *               description:
 *                 type: string
 *                 example: Tutorials and good practices
 *     responses:
 *       201:
 *         description: Category created successfully
 *
 *   get:
 *     tags: [ArticleCategory]
 *     summary: List all article categories
 *     responses:
 *       200:
 *         description: List of categories
 *
 * /api/v1/articles/categories/{id}:
 *   get:
 *     tags: [ArticleCategory]
 *     summary: Get category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 *
 *   put:
 *     tags: [ArticleCategory]
 *     summary: Update a category
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *
 *   delete:
 *     tags: [ArticleCategory]
 *     summary: Delete a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */

router.post("/", asyncHandler((req, res) => ctrl.createCategory(req, res)));

router.get("/", asyncHandler((req, res) => ctrl.getAllCategories(req, res)));

router.get("/:id", asyncHandler((req, res) => ctrl.getCategoryById(req, res)));

router.put("/:id", asyncHandler((req, res) => ctrl.updateCategory(req, res)));

router.delete("/:id", asyncHandler((req, res) => ctrl.deleteCategory(req, res)));

export default router;
