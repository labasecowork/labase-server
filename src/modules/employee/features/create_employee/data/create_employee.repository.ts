// src/modules/employee/features/create_employee/data/create_employee.repository.ts

import prisma from "../../../../../config/prisma_client";
import { user_type, user_status } from "@prisma/client";

interface CreateEmployeeData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: user_type;
  profile_image?: string;
  phone?: string;
  birth_date?: Date;
  gender?: string;
  work_area_id?: string;
  company_id?: string;
}

export class CreateEmployeeRepository {
  async findUserByEmail(email: string) {
    return await prisma.users.findUnique({
      where: { email },
    });
  }

  async createEmployee(data: CreateEmployeeData) {
    // Crear usuario y empleado en una transacción
    return await prisma.$transaction(async (tx) => {
      // Crear usuario
      const user = await tx.users.create({
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
          user_type: data.user_type,
          profile_image: data.profile_image,
          phone: data.phone,
          birth_date: data.birth_date,
          gender: data.gender,
          status: "active" as user_status,
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          user_type: true,
          status: true,
        },
      });

      // Crear registro de empleado
      const employee = await tx.employeeDetails.create({
        data: {
          employee_id: user.id,
          work_area_id: data.work_area_id ?? null,
          company_id: data.company_id ?? null,
        },
      });

      return {
        employee_id: employee.employee_id,
        user,
      };
    });
  }
}
