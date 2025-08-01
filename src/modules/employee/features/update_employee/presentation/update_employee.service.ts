// src/modules/employee/features/update_employee/presentation/update_employee.service.ts

import { UpdateEmployeeBodyDTO } from "../domain/update_employee.dto";
import { UpdateEmployeeRepository } from "../data/update_employee.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import bcrypt from "bcrypt";

interface CurrentUser {
  id: string;
  role: "client" | "admin" | "employee";
}

export class UpdateEmployeeService {
  constructor(private readonly repo = new UpdateEmployeeRepository()) {}

  async execute(
    employeeId: string,
    dto: UpdateEmployeeBodyDTO,
    user: CurrentUser
  ) {
    // Verificar que el usuario sea administrador
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden actualizar empleados",
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

    // Si se actualiza el email, verificar que no exista otro usuario con ese email
    if (dto.email) {
      const existingUser = await this.repo.findUserByEmail(
        dto.email,
        employee.user.id
      );
      if (existingUser) {
        throw new AppError(
          "Ya existe otro usuario con este email",
          HttpStatusCodes.CONFLICT.code
        );
      }
    }

    // Preparar datos de actualización
    const updateData: any = {};

    if (dto.first_name) updateData.first_name = dto.first_name;
    if (dto.last_name) updateData.last_name = dto.last_name;
    if (dto.email) updateData.email = dto.email;
    if (dto.user_type) updateData.user_type = dto.user_type;
    if (dto.profile_image !== undefined)
      updateData.profile_image = dto.profile_image;
    if (dto.phone !== undefined) updateData.phone = dto.phone;
    if (dto.birth_date) updateData.birth_date = dto.birth_date;
    if (dto.gender !== undefined) updateData.gender = dto.gender;
    if (dto.status) updateData.status = dto.status;

    // Si se actualiza la contraseña, hashearla
    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 12);
    }

    // Actualizar el empleado
    const updatedUser = await this.repo.updateEmployee(employeeId, updateData);

    return {
      message: "Empleado actualizado exitosamente",
      employee_id: employeeId,
      user: updatedUser,
    };
  }
}
