// src/modules/attendance/features/mark_attendance/data/mark_attendance.repository.ts
import prisma from "../../../../../config/prisma_client";
import { attendance_type } from "@prisma/client";

export class MarkAttendanceRepository {
  async findEmployeeByUserId(userId: string) {
    return await prisma.employee_details.findUnique({
      where: { employee_id: userId },
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
    });
  }

  async getLastAttendanceForEmployee(employeeId: string) {
    return await prisma.attendance.findFirst({
      where: { employee_id: employeeId },
      orderBy: [{ date: "desc" }, { check_time: "desc" }],
    });
  }

  async create(data: {
    employee_id: string;
    type: attendance_type;
    date: Date;
    check_time: Date;
  }) {
    return await prisma.attendance.create({
      data,
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
    });
  }
}
