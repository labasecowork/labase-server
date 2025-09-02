// src/modules/visitor/features/create_visitor/service/create_visitor.routes.ts
import { Router } from "express";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { CreateVisitorController } from "../../create_visitor/presentation/create_visitor.controller";
import { LookupVisitorController } from "../../lookup_visitor/presentation/lookup.controller";

const router = Router();
const createCtrl = new CreateVisitorController();
const lookupCtrl = new LookupVisitorController();

/**
 * @openapi
 * /api/v1/visitors:
 *   post:
 *     tags: [Visitor]
 *     summary: Crear visitante (manual o con datos del lookup)
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni: { type: string, example: "46027897" }
 *               ruc: { type: string, example: "20601030013" }
 *               first_name: { type: string, example: "ROXANA KARINA" }
 *               last_name: { type: string, example: "DELGADO CUELLAR" }
 *               phone: { type: string, example: "999888777" }
 *               email: { type: string, example: "rdelgado@example.com" }
 *               client_id: { type: string, format: uuid }
 *               space_id: { type: string, format: uuid }
 *               entry_time: { type: string, format: date-time }
 *               exit_time: { type: string, format: date-time }
 *           examples:
 *             manual:
 *               value:
 *                 first_name: "Juan"
 *                 last_name: "Pérez"
 *                 client_id: "uuid-client"
 *                 space_id: "uuid-space"
 *                 entry_time: "2025-08-08T15:30:00.000Z"
 *             with_lookup_dni:
 *               value:
 *                 dni: "46027897"
 *                 first_name: "ROXANA KARINA"
 *                 last_name: "DELGADO CUELLAR"
 *                 client_id: "uuid-client"
 *                 space_id: "uuid-space"
 *                 entry_time: "2025-08-08T15:30:00.000Z"
 */
router.post(
  "/",
  authenticateToken,
  asyncHandler(createCtrl.handle.bind(createCtrl))
);

/**
 * @openapi
 * /api/v1/visitors/lookup:
 *   get:
 *     tags: [Visitor]
 *     summary: Buscar datos en RENIEC/SUNAT
 *     parameters:
 *       - in: query
 *         name: dni
 *         schema: { type: string, example: "12345678" }
 *       - in: query
 *         name: ruc
 *         schema: { type: string, example: "20123456789" }
 *     security: [ { bearerAuth: [] } ]
 */
router.get(
  "/lookup",
  authenticateToken,
  asyncHandler(lookupCtrl.handle.bind(lookupCtrl))
);

export { router as createAndLookupVisitorRoutes };
