// src/modules/space/features/edit_space/presentation/routes/edit_space.routes.ts
import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { EditSpaceController } from "./edit_space.controller";

const router = Router();
const ctrl = new EditSpaceController();
/**
 * @openapi
 * /api/v1/space/update/{id}:
 *   put:
 *     tags:
 *       - Space
 *     summary: Update an existing space
 *     description: Allows admins to modify the attributes of a space, including capacity, access, and associated benefits.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the space to update
 *         schema:
 *           type: string
 *         example: "clxyz123abc"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sala Renovada"
 *               description:
 *                 type: string
 *                 example: "Espacio actualizado con nuevo mobiliario"
 *               capacityMin:
 *                 type: integer
 *                 example: 2
 *               capacityMax:
 *                 type: integer
 *                 example: 12
 *               access:
 *                 type: string
 *                 enum: [PUBLIC, PRIVATE]
 *                 example: "PRIVATE"
 *               allowByUnit:
 *                 type: boolean
 *                 example: true
 *               allowFullRoom:
 *                 type: boolean
 *                 example: false
 *               benefitIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example: ["6a98e4c4-937e-48e1-9c7e-126f20b95b0e"]
 *     responses:
 *       200:
 *         description: Space updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Space not found
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */

router.put("/:id", authenticateToken, asyncHandler(ctrl.handle.bind(ctrl)));

export { router as editSpaceRoutes };
