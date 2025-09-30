// src/modules/attendance/features/admin_correct_point/presentation/admin_correct_point.service.ts
import { AdminCorrectPointDTO } from "../domain/admin_correct_point.schema";
import { AdminCorrectPointRepository } from "../data/admin_correct_point.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../constants/messages";
import {
  getWeekday,
  combineDateAndTime,
} from "../../../shared/attendance.utils";
import { evaluateMarkFlags } from "../../../shared/attendance.utils";
import { MarkType, WorkMode } from "../../../shared/attendance.constants";

export class AdminCorrectPointService {
  constructor(private readonly repo = new AdminCorrectPointRepository()) {}

  async execute(dto: AdminCorrectPointDTO) {
    const point = await this.repo.findById(dto.attendance_point_id);
    if (!point)
      throw new AppError(
        "No se encontró el punto de asistencia.",
        HttpStatusCodes.NOT_FOUND.code
      );

    const [hh, mm] = dto.new_mark_time.split(":").map(Number);
    const newTime = combineDateAndTime(
      point.date,
      new Date(0, 0, 1, hh, mm, 0, 0)
    )!; 
    const weekday = getWeekday(point.date);
    const policy = await this.repo.getPolicy(point.employee_id);
    const schedule = await this.repo.getScheduleForWeekday(
      point.employee_id,
      weekday
    );

    let in_schedule = true,
      is_late = false,
      is_early = false;
    if (policy && schedule) {
      const request_mode: WorkMode = point.is_remote ? "remote" : "onsite";
      const flags = evaluateMarkFlags(
        newTime,
        point.mark_type as MarkType,
        request_mode,
        schedule as any,
        policy as any,
        point.date
      );
      in_schedule = flags.in_schedule;
      is_late = flags.is_late;
      is_early = flags.is_early;
    } else {
      in_schedule = false;
      is_late = false;
      is_early = false;
    }

    const updated = await this.repo.updateTimeAndAudit(point.id, {
      mark_time: newTime,
      in_schedule,
      is_late,
      is_early,
      note: dto.note,
    });

    return {
      message: MESSAGES.ATTENDANCE.POINT_CORRECTED,
      id: updated.id,
      date: updated.date,
      mark_type: updated.mark_type,
      mark_time: updated.mark_time,
      note: updated.note,
      is_manual: updated.is_manual,
      edited_at: updated.edited_at,
      flags: {
        in_schedule: updated.in_schedule,
        is_late: updated.is_late,
        is_early: updated.is_early,
        is_remote: point.is_remote,
      },
    };
  }
}
