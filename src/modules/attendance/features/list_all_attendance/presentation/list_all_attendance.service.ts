// src/modules/attendance/features/list_all_attendance/presentation/list_all_attendance.service.ts

import { ListAllAttendanceDTO } from "../domain/list_all_attendance.dto";
import { ListAllAttendanceRepository } from "../data/list_all_attendance.repository";
import { format } from "date-fns";

export class ListAllAttendanceService {
  constructor(private readonly repo = new ListAllAttendanceRepository()) {}

  async execute(dto: ListAllAttendanceDTO) {
    const result = await this.repo.findAttendances({
      page: dto.page,
      limit: dto.limit,
      employee_id: dto.employee_id,
      start_date: dto.start_date,
      end_date: dto.end_date,
      type: dto.type,
    });

    const totalPages = Math.ceil(result.total / dto.limit);

    return {
      attendances: result.attendances.map((attendance) => ({
        id: attendance.id,
        employee_id: attendance.employee_id,
        type: attendance.type,
        date: format(attendance.date, "yyyy-MM-dd"),
        check_time: format(attendance.check_time, "HH:mm:ss"),
        employee: attendance.employee,
      })),
      pagination: {
        page: dto.page,
        limit: dto.limit,
        total: result.total,
        totalPages,
      },
    };
  }
}
