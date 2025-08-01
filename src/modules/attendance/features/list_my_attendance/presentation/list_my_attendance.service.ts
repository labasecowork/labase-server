// src/modules/attendance/features/list_my_attendance/presentation/list_my_attendance.service.ts

import { ListMyAttendanceDTO } from "../domain/list_my_attendance.dto";
import { ListMyAttendanceRepository } from "../data/list_my_attendance.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { format } from "date-fns";

export class ListMyAttendanceService {
  constructor(private readonly repo = new ListMyAttendanceRepository()) {}

  async execute(dto: ListMyAttendanceDTO, userId: string) {
    // Verificar que el usuario sea un empleado
    const employee = await this.repo.findEmployeeByUserId(userId);
    if (!employee) {
      throw new AppError(
        "Solo los empleados pueden consultar sus asistencias",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const result = await this.repo.findMyAttendances({
      employee_id: employee.employee_id,
      page: dto.page,
      limit: dto.limit,
      start_date: dto.start_date,
      end_date: dto.end_date,
      type: dto.type,
    });

    const totalPages = Math.ceil(result.total / dto.limit);

    return {
      attendances: result.attendances.map((attendance) => ({
        id: attendance.id,
        type: attendance.type,
        date: format(attendance.date, "yyyy-MM-dd"),
        check_time: format(attendance.check_time, "HH:mm:ss"),
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
