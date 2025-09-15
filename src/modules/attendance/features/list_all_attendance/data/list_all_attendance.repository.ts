import { attendance_type } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

interface FindAttendancesParams {
  page: number;
  limit: number;
  employee_id?: string;
  start_date?: Date;
  end_date?: Date;
  type?: attendance_type;
  search?: string;
  work_area_id?: string;
  company_id?: string;
  all?: boolean;
}

export class ListAllAttendanceRepository {
  async findAttendances(params: FindAttendancesParams) {
    const {
      page,
      limit,
      employee_id,
      start_date,
      end_date,
      type,
      search,
      work_area_id,
      company_id,
      all,
    } = params;
    const skip = all ? undefined : (page - 1) * limit;
    const take = all ? undefined : limit;

    const where: any = {
      ...(employee_id && { employee_id }),
      ...(type && { type }),
      ...((start_date || end_date) && {
        date: {
          ...(start_date && { gte: start_date }),
          ...(end_date && { lte: end_date }),
        },
      }),
    };

    // Construir filtros del empleado
    const employeeFilters: any = {};

    if (work_area_id) {
      employeeFilters.work_area_id = work_area_id;
    }

    if (company_id) {
      employeeFilters.company_id = company_id;
    }

    if (search) {
      employeeFilters.user = {
        OR: [
          { first_name: { contains: search, mode: "insensitive" as const } },
          { last_name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      };
    }

    // Solo agregar filtros de empleado si hay alguno
    if (Object.keys(employeeFilters).length > 0) {
      where.employee = employeeFilters;
    }

    const [attendances, total] = await Promise.all([
      prisma.attendance.findMany({
        where,
        skip,
        take,
        orderBy: [{ date: "desc" }, { check_time: "desc" }],
        include: {
          employee: {
            include: {
              user: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  email: true,
                },
              },
            },
          },
        },
      }),
      prisma.attendance.count({ where }),
    ]);

    return {
      attendances,
      total,
    };
  }
}
