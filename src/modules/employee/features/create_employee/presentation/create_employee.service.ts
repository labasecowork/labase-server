// src/modules/employee/features/create_employee/presentation/create_employee.service.ts

import { CreateEmployeeDTO } from "../domain/create_employee.dto";
import { CreateEmployeeRepository } from "../data/create_employee.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import bcrypt from "bcrypt";

interface CurrentUser {
  id: string;
  role: "client" | "admin" | "employee";
}

export class CreateEmployeeService {
  constructor(private readonly repo = new CreateEmployeeRepository()) {}

  async execute(dto: CreateEmployeeDTO, user: CurrentUser) {
    // Verificar que el usuario sea administrador
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden crear empleados",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    // Verificar que el email no existe
    const existingUser = await this.repo.findUserByEmail(dto.email);
    if (existingUser) {
      throw new AppError(
        "Ya existe un usuario con este email",
        HttpStatusCodes.CONFLICT.code
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(dto.password, 12);

    // Crear el empleado
    const result = await this.repo.createEmployee({
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      password: hashedPassword,
      user_type: dto.user_type,
      profile_image: dto.profile_image,
      phone: dto.phone,
      birth_date: dto.birth_date,
      gender: dto.gender,
    });

    return {
      message: "Empleado creado exitosamente",
      employee_id: result.employee_id,
      user: result.user,
    };
  }
}
