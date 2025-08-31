// src/modules/space/features/detail_space/presentation/routes/detail_space.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { DetailSpaceController } from "./detail_space.controller";
import { authenticateToken } from "../../../../../middlewares";

const router = Router();
const ctrl = new DetailSpaceController();
/**
 * @openapi
 * /api/v1/space/detail/{id}:
 *   get:
 *     tags:
 *       - Space
 *     summary: Get details of a specific space
 *     description: Returns full information about a space, including prices and benefits.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Space ID
 *         schema:
 *           type: string
 *         example: "clxyz123abc"
 *     responses:
 *       200:
 *         description: Space detail retrieved successfully
 *       404:
 *         description: Space not found
 *       500:
 *         description: Internal server error
 */

router.get("/:id", authenticateToken, asyncHandler(ctrl.handle.bind(ctrl)));

export { router as detailSpaceRoutes };
