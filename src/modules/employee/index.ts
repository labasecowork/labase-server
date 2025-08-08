// src/modules/employee/index.ts
import { Router } from "express";

import { listEmployeesRoutes } from "./features/list_employees";
import { getEmployeeRoutes } from "./features/get_employee";
import { createEmployeeRoutes } from "./features/create_employee";
import { updateEmployeeRoutes } from "./features/update_employee";
import { deactivateEmployeeRoutes } from "./features/deactivate_employee";
import { activateEmployeeRoutes } from "./features/activate_employee";

export const employeeRouter = Router();

employeeRouter.use("/employee", listEmployeesRoutes);
employeeRouter.use("/employee", getEmployeeRoutes);
employeeRouter.use("/employee", createEmployeeRoutes);
employeeRouter.use("/employee", updateEmployeeRoutes);
employeeRouter.use("/employee", deactivateEmployeeRoutes);
employeeRouter.use("/employee", activateEmployeeRoutes);

/**
 * MATCHES:
 *  GET    /api/v1/employee                    → listar todos los empleados (solo admin)
 *  GET    /api/v1/employee/:id                → obtener empleado por ID (solo admin)
 *  POST   /api/v1/employee                    → crear nuevo empleado (solo admin)
 *  PATCH  /api/v1/employee/:id                → actualizar empleado (solo admin)
 *  DELETE /api/v1/employee/:id                → desactivar empleado (solo admin)
 *  PATCH  /api/v1/employee/:id/activate       → activar empleado (solo admin)
 */
export default employeeRouter;
