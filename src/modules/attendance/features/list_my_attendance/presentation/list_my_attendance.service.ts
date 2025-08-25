// src/modules/attendance/features/list_my_attendance/presentation/list_my_attendance.service.ts

import { ListMyAttendanceDTO } from "../domain/list_my_attendance.dto";
import { ListMyAttendanceRepository } from "../data/list_my_attendance.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { format, formatInTimeZone, toZonedTime } from "date-fns-tz";
import { TIMEZONE } from "../../../../../config/env";

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
      attendances: result.attendances.map((attendance) => {
        const onlyDate = attendance.date.toISOString().slice(0, 10);
        const checkTime = attendance.check_time.toISOString().slice(11, 19);
        const combinedUtc = new Date(`${onlyDate}T${checkTime}Z`);
        const date = formatInTimeZone(combinedUtc, TIMEZONE, "yyyy-MM-dd");
        const time = formatInTimeZone(combinedUtc, TIMEZONE, "HH:mm:ss");
        return {
          id: attendance.id,
          type: attendance.type,
          date: date,
          check_time: time,
        };
      }),
      pagination: {
        page: dto.page,
        limit: dto.limit,
        total: result.total,
        totalPages,
      },
    };
  }
}
