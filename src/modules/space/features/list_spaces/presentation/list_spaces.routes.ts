// src/modules/space/features/list_spaces/presentation/routes/list_spaces.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { ListSpacesController } from "./list_spaces.controller";

const router = Router();
const controller = new ListSpacesController();
/**
 * @openapi
 * /api/v1/space/list:
 *   get:
 *     tags:
 *       - Space
 *     summary: List all available spaces
 *     description: Returns a list of spaces filtered by optional type and capacity.
 *     parameters:
 *       - name: type
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [UNIT, SHARED_SITE, FULL_ROOM]
 *         example: "SHARED_SITE"
 *       - name: capacity
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 5
 *       - name: available
 *         in: query
 *         required: false
 *         schema:
 *           type: boolean
 *         example: true
 *     responses:
 *       200:
 *         description: List of spaces matching filters
 *       400:
 *         description: Validation error in query parameters
 *       500:
 *         description: Internal server error
 */

router.get("/", asyncHandler(controller.handle.bind(controller)));

export { router as listSpacesRoutes };

