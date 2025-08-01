// src/modules/space/features/deactivate_space/presentation/deactivate_space.routes.ts
import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { DeactivateSpaceController } from "./deactivate_space.controller";

const router = Router({ mergeParams: true });
const ctrl = new DeactivateSpaceController();

/**
 * @openapi
 * /api/v1/space/{id}/deactivate/:
 *   patch:
 *     tags:
 *       - Space
 *     summary: Deactivate a space
 *     description: 'Marks a space as inactive by setting "disabled: true". Only accessible by admins.'
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "clxyz123abc"
 *     responses:
 *       200:
 *         description: Space successfully deactivated
 *       404:
 *         description: Space not found
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */


router.patch("/", authenticateToken, asyncHandler(ctrl.handle.bind(ctrl)));

export { router as deactivateSpaceRoutes };
