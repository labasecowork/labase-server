// src/modules/attendance/features/list_all_attendance/data/list_all_attendance.repository.ts
import { attendance_type } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

interface FindAttendancesParams {
  page: number;
  limit: number;
  employee_id?: string;
  start_date?: Date;
  end_date?: Date;
  type?: attendance_type;
}

export class ListAllAttendanceRepository {
  async findAttendances(params: FindAttendancesParams) {
    const { page, limit, employee_id, start_date, end_date, type } = params;
    const skip = (page - 1) * limit;

    const where = {
      ...(employee_id && { employee_id }),
      ...(type && { type }),
      ...((start_date || end_date) && {
        date: {
          ...(start_date && { gte: start_date }),
          ...(end_date && { lte: end_date }),
        },
      }),
    };

    const [attendances, total] = await Promise.all([
      prisma.attendance.findMany({
        where,
        skip,
        take: limit,
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
