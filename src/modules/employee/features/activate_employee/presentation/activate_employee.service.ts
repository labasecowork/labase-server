// src/modules/employee/features/activate_employee/presentation/activate_employee.service.ts

import { ActivateEmployeeRepository } from "../data/activate_employee.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

interface CurrentUser {
  id: string;
  role: "client" | "admin" | "employee";
}

export class ActivateEmployeeService {
  constructor(private readonly repo = new ActivateEmployeeRepository()) {}

  async execute(employeeId: string, user: CurrentUser) {
    // Verificar que el usuario sea administrador
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden activar empleados",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    // Verificar que el empleado existe
    const employee = await this.repo.findEmployeeById(employeeId);
    if (!employee) {
      throw new AppError(
        "Empleado no encontrado",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    // Verificar que el empleado no esté ya activo
    if (employee.user.status === "active") {
      throw new AppError(
        "El empleado ya está activo",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    // Activar el empleado
    const activatedUser = await this.repo.activateEmployee(employeeId);

    return {
      message: "Empleado activado exitosamente",
      employee_id: employeeId,
      user: activatedUser,
    };
  }
}
