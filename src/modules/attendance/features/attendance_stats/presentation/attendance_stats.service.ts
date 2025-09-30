// src/modules/attendance/features/attendance_stats/presentation/attendance_stats.service.ts
import { AttendanceStatsDTO } from "../domain/attendance_stats.dto";
import { AttendanceStatsRepository } from "../data/attendance_stats.repository";
import {
  calcWorkedMinutes,
  combineDateAndTime,
} from "../../../shared/attendance.utils";
import { MarkType } from "../../../shared/attendance.constants";

export class AttendanceStatsService {
  constructor(private readonly repo = new AttendanceStatsRepository()) {}

  async execute(dto: AttendanceStatsDTO) {
    const result = await this.repo.findAttendanceData({
      employee_id: dto.employee_id,
      start_date: dto.start_date,
      end_date: dto.end_date,
    });

    const byDate = new Map<string, typeof result.attendances>();
    for (const a of result.attendances) {
      const key = a.date.toISOString().slice(0, 10);
      const arr = byDate.get(key) ?? [];
      arr.push(a);
      byDate.set(key, arr);
    }

    let grandTotalMinutes = 0;
    for (const [_, arr] of byDate.entries()) {
      const pointsForCalc = arr.map((p) => ({
        mark_type: p.mark_type as MarkType,
        mark_time: combineDateAndTime(p.date, p.mark_time)!,
      }));
      grandTotalMinutes += calcWorkedMinutes(pointsForCalc);
    }

    const hours = Math.floor(grandTotalMinutes / 60);
    const minutes = Math.round(grandTotalMinutes % 60);
    const totalHoursLabel = `${hours}h ${minutes}m`;

    return {
      total_registered_days: result.totalRegisteredDays,
      total_records: result.totalRecords,
      total_hours: totalHoursLabel,
      total_employees: result.totalEmployees,
    };
  }
}
