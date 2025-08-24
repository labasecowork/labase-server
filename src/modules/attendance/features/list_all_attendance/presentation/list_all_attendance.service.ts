// src/modules/attendance/features/list_all_attendance/presentation/list_all_attendance.service.ts
import { format } from "date-fns";
import { attendance_type } from "@prisma/client";
import { ListAllAttendanceDTO } from "../domain/list_all_attendance.dto";
import { ListAllAttendanceRepository } from "../data/list_all_attendance.repository";

export class ListAllAttendanceService {
  constructor(private readonly repo = new ListAllAttendanceRepository()) {}

  async execute(dto: ListAllAttendanceDTO) {
    const result = await this.repo.findAttendances({
      page: dto.page,
      limit: dto.limit,
      employee_id: dto.employee_id,
      start_date: dto.start_date,
      end_date: dto.end_date,
      type: dto.type as attendance_type,
    });

    const attendances = result.attendances.map((a) => ({
      id: a.id,
      employee_id: a.employee_id,
      type: a.type as attendance_type,
      date: format(a.date, "yyyy-MM-dd"),
      check_time: format(a.check_time, "HH:mm:ss"),
      employee: {
        employee_id: a.employee.employee_id,
        user: {
          id: a.employee.user.id,
          name: `${a.employee.user.first_name} ${a.employee.user.last_name}`,
          email: a.employee.user.email,
        },
      },
    }));

    return {
      attendances,
      pagination: {
        page: dto.page,
        limit: dto.limit,
        total: result.total,
        totalPages: Math.ceil(result.total / dto.limit),
      },
    };
  }
}
