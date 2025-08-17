// src/modules/attendance/features/mark_attendance/presentation/mark_attendance.service.ts
import { MarkAttendanceDTO } from "../domain/mark_attendance.dto";
import { MarkAttendanceRepository } from "../data/mark_attendance.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { isAfter, isSameDay, format } from "date-fns";
import type { CurrentUser } from "../../../../../utils/authenticated_user";

export class MarkAttendanceService {
  constructor(private readonly repo = new MarkAttendanceRepository()) {}

  async execute(
    dto: MarkAttendanceDTO,
    user: Pick<CurrentUser, "id" | "role">,
  ) {
    // 🔐 Política: solo empleados pueden marcar asistencia
    if (user.role !== "employee") {
      throw new AppError(
        "Solo los empleados pueden marcar asistencia",
        HttpStatusCodes.FORBIDDEN.code,
      );
    }

    // Verificar que exista el registro de empleado vinculado al usuario
    const employee = await this.repo.findEmployeeByUserId(user.id);
    if (!employee) {
      throw new AppError(
        "Solo los empleados pueden marcar asistencia",
        HttpStatusCodes.FORBIDDEN.code,
      );
    }

    // Última asistencia
    const lastAttendance = await this.repo.getLastAttendanceForEmployee(
      employee.employee_id,
    );

    const now = new Date();
    const currentDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const currentTime = now;

    if (lastAttendance) {
      if (isSameDay(lastAttendance.date, currentDate)) {
        if (lastAttendance.type === "ENTRY" && dto.type === "ENTRY") {
          throw new AppError(
            "No puedes marcar entrada después de entrada. Primero debes marcar salida.",
            HttpStatusCodes.BAD_REQUEST.code,
          );
        }
        if (lastAttendance.type === "EXIT" && dto.type === "EXIT") {
          throw new AppError(
            "No puedes marcar salida después de salida. Primero debes marcar entrada.",
            HttpStatusCodes.BAD_REQUEST.code,
          );
        }
        if (lastAttendance.type === "EXIT" && dto.type === "ENTRY") {
          const lastCheckDateTime = new Date(
            lastAttendance.date.getFullYear(),
            lastAttendance.date.getMonth(),
            lastAttendance.date.getDate(),
            lastAttendance.check_time.getHours(),
            lastAttendance.check_time.getMinutes(),
            lastAttendance.check_time.getSeconds(),
          );
          if (!isAfter(currentTime, lastCheckDateTime)) {
            throw new AppError(
              "La nueva entrada debe ser posterior a la última salida",
              HttpStatusCodes.BAD_REQUEST.code,
            );
          }
        }
      } else {
        if (lastAttendance.type === "ENTRY" && dto.type === "ENTRY") {
          throw new AppError(
            `Tienes una entrada pendiente del ${format(lastAttendance.date, "dd/MM/yyyy")}. Debes marcar salida primero.`,
            HttpStatusCodes.BAD_REQUEST.code,
          );
        }
        if (lastAttendance.type === "EXIT" && dto.type === "EXIT") {
          throw new AppError(
            `Ya marcaste salida el ${format(lastAttendance.date, "dd/MM/yyyy")}. Debes marcar entrada primero.`,
            HttpStatusCodes.BAD_REQUEST.code,
          );
        }
      }
    } else {
      if (dto.type === "EXIT") {
        throw new AppError(
          "Tu primera marca de asistencia debe ser una entrada",
          HttpStatusCodes.BAD_REQUEST.code,
        );
      }
    }

    const attendance = await this.repo.create({
      employee_id: employee.employee_id,
      type: dto.type,
      date: currentDate,
      check_time: currentTime,
    });

    return {
      message: `Asistencia marcada exitosamente: ${dto.type === "ENTRY" ? "Entrada" : "Salida"}`,
      attendance_id: attendance.id,
      type: attendance.type,
      date: format(attendance.date, "yyyy-MM-dd"),
      check_time: format(attendance.check_time, "HH:mm:ss"),
    };
  }
}
