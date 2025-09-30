//src/modules/attendance/features/mark_attendance/presentation/mark_attendance.service.ts
import { MarkAttendanceDTO } from "../domain/mark_attendance.schema";
import { MarkAttendanceRepository } from "../data/mark_attendance.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../constants/messages";
import { getWeekday, getNextMarkType, evaluateMarkFlags, today, toLocalDateOnly } from "../../../shared/attendance.utils";
import { MarkType } from "../../../shared/attendance.constants";

export class MarkAttendanceService {
  constructor(private readonly repo = new MarkAttendanceRepository()) {}

  async execute(dto: MarkAttendanceDTO & { requester_employee_id: string }) {
    const employee_id = dto.employee_id ?? dto.requester_employee_id;
    const baseDate = toLocalDateOnly(today());
    const weekday = getWeekday(baseDate);

    const policy = await this.repo.getPolicy(employee_id);
    if (!policy) throw new AppError(MESSAGES.ATTENDANCE.POLICY_NOT_FOUND, HttpStatusCodes.BAD_REQUEST.code);

    const schedule = await this.repo.getScheduleForWeekday(employee_id, weekday);
    if (!schedule) throw new AppError(MESSAGES.ATTENDANCE.SCHEDULE_NOT_FOUND, HttpStatusCodes.BAD_REQUEST.code);

    const expected_points = schedule.expected_points === 4 ? 4 : 2;

    const pointsToday = await this.repo.getPointsForDate(employee_id, baseDate);
    const already: MarkType[] = pointsToday.map(p => p.mark_type as MarkType);

    const next = getNextMarkType(already, expected_points);
    if (!next) {
      return { message: MESSAGES.ATTENDANCE.DAY_COMPLETE, next_mark: null, recorded: null };
    }

    const flags = evaluateMarkFlags(
      new Date(), next, dto.request_mode, schedule as any, policy as any, baseDate
    );

    const created = await this.repo.createPoint({
      employee_id,
      date: baseDate,
      mark_type: next,
      mark_time: new Date(),
      in_schedule: flags.in_schedule,
      is_late: flags.is_late,
      is_early: flags.is_early,
      is_remote: flags.is_remote,
      note: dto.note,
    });

    return {
      message: MESSAGES.ATTENDANCE.MARKED_SUCCESS,
      next_mark: next,
      recorded: {
        id: created.id,
        date: created.date,
        mark_type: created.mark_type,
        mark_time: created.mark_time,
        flags,
      },
    };
  }
}
