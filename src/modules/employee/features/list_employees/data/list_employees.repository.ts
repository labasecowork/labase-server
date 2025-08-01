// src/modules/employee/features/list_employees/data/list_employees.repository.ts

import prisma from "../../../../../config/prisma_client";
import { user_status } from "@prisma/client";

interface FindEmployeesParams {
  page: number;
  limit: number;
  status?: user_status;
  search?: string;
}

export class ListEmployeesRepository {
  async findEmployees(params: FindEmployeesParams) {
    const { page, limit, status, search } = params;
    const skip = (page - 1) * limit;

    const where = {
      ...(status && {
        user: {
          status,
        },
      }),
      ...(search && {
        user: {
          OR: [
            { first_name: { contains: search, mode: "insensitive" as const } },
            { last_name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        },
      }),
    };

    const [employees, total] = await Promise.all([
      prisma.employeeDetails.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              user_type: true,
              profile_image: true,
              phone: true,
              birth_date: true,
              gender: true,
              status: true,
              creation_timestamp: true,
            },
          },
        },
        orderBy: {
          user: {
            creation_timestamp: "desc",
          },
        },
      }),
      prisma.employeeDetails.count({ where }),
    ]);

    return {
      employees,
      total,
    };
  }
}
