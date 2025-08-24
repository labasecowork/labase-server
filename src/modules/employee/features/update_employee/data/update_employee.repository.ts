// src/modules/employee/features/update_employee/data/update_employee.repository.ts

import prisma from "../../../../../config/prisma_client";
import { user_type, user_status } from "@prisma/client";

interface UpdateEmployeeData {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  user_type?: user_type;
  profile_image?: string;
  phone?: string;
  birth_date?: Date;
  gender?: string;
  status?: user_status;
  work_area_id?: string;
  company_id?: string;
}

export class UpdateEmployeeRepository {
  async findEmployeeById(employeeId: string) {
    return await prisma.employeeDetails.findUnique({
      where: { employee_id: employeeId },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            user_type: true,
            status: true,
          },
        },
      },
    });
  }

  async findUserByEmail(email: string, excludeUserId?: string) {
    return await prisma.users.findFirst({
      where: {
        email,
        ...(excludeUserId && { id: { not: excludeUserId } }),
      },
    });
  }

  async updateEmployee(employeeId: string, data: UpdateEmployeeData) {
    return await prisma.users.update({
      where: { id: employeeId },
      data,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        user_type: true,
        status: true,
      },
    });
  }
}
