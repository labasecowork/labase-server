// src/modules/employee/index.ts
import { Router } from "express";

import { listEmployeesRoutes } from "./features/list_employees";
import { createEmployeeRoutes } from "./features/create_employee";
import { updateEmployeeRoutes } from "./features/update_employee";
import { deactivateEmployeeRoutes } from "./features/deactivate_employee";

export const employeeRouter = Router();

employeeRouter.use("/employee", listEmployeesRoutes);
employeeRouter.use("/employee", createEmployeeRoutes);
employeeRouter.use("/employee", updateEmployeeRoutes);
employeeRouter.use("/employee", deactivateEmployeeRoutes);

/**
 * MATCHES:
 *  GET    /api/v1/employee                    → listar todos los empleados (solo admin)
 *  POST   /api/v1/employee                    → crear nuevo empleado (solo admin)
 *  PATCH  /api/v1/employee/:id                → actualizar empleado (solo admin)
 *  DELETE /api/v1/employee/:id                → desactivar empleado (solo admin)
 */
export default employeeRouter;
