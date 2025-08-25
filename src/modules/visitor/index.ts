import { Router } from "express";

import { createAndLookupVisitorRoutes } from "./features/create_visitor/service/create_visitor.routes";
import { getVisitorsRoutes } from "./features/get_visitors/presentation/get_visitors.routes";
import { editVisitorRoutes } from "./features/edit_visitor/presentation/edit_visitor.routes";
import { deleteVisitorRoutes } from "./features/delete_visitor/presentation/delete_visitor.routes";

const visitorRouter = Router();

visitorRouter.use("/", createAndLookupVisitorRoutes);
visitorRouter.use("/", getVisitorsRoutes);
visitorRouter.use("/", editVisitorRoutes);
visitorRouter.use("/", deleteVisitorRoutes);
/**
 * MATCHES:
 * POST /api/v1/visitors → Crear visitante manual
 * GET /api/v1/visitors/lookup?dni=12345678 → Lookup RENIEC
 * GET /api/v1/visitors/lookup?ruc=20123456789 → Lookup SUNAT
 * GET /api/v1/visitors → Listar visitantes (paginado + filtros)
 * GET /api/v1/visitors/:id → Detalle de visitante
 * PUT /api/v1/visitors/:id → Editar visitante (checkout / update)
 * DELETE /api/v1/visitors/:id → Eliminar visitante
 */

export default visitorRouter;
