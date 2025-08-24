// src/modules/company/features/delete_company/presentation/delete_company.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { DeleteCompanyController } from "./delete_company.controller";

const router = Router();
const controller = new DeleteCompanyController();

/**
 * @openapi
 * /api/v1/company/{id}:
 *   delete:
 *     tags: [Company]
 *     summary: Eliminar una empresa (Solo Admin)
 *     description: |
 *       Permite a los administradores eliminar una empresa.
 *
 *       **Características:**
 *       - Solo administradores pueden eliminar empresas
 *       - No se puede eliminar si tiene empleados asignados
 *       - La eliminación es permanente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Empresa eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Empresa eliminada exitosamente"
 *       403:
 *         description: Solo administradores pueden eliminar empresas
 *       404:
 *         description: Empresa no encontrada
 *       409:
 *         description: No se puede eliminar porque tiene empleados asignados
 *       500:
 *         description: Error interno del servidor
 */
router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(controller.handle.bind(controller))
);

export { router as deleteCompanyRoutes };
