// src/modules/attendance/features/list_my_attendance/data/list_my_attendance.repository.ts

import prisma from "../../../../../config/prisma_client";
import { AttendanceType } from "@prisma/client";

interface FindMyAttendancesParams {
  employee_id: string;
  page: number;
  limit: number;
  start_date?: Date;
  end_date?: Date;
  type?: AttendanceType;
}

export class ListMyAttendanceRepository {
  async findEmployeeByUserId(userId: string) {
    return await prisma.employeeDetails.findUnique({
      where: { employee_id: userId },
    });
  }

  async findMyAttendances(params: FindMyAttendancesParams) {
    const { employee_id, page, limit, start_date, end_date, type } = params;
    const skip = (page - 1) * limit;

    const where = {
      employee_id,
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
        select: {
          id: true,
          type: true,
          date: true,
          check_time: true,
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
