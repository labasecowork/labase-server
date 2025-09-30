// src/modules/attendance/features/admin_correct_point/data/admin_correct_point.repository.ts
import prisma from "../../../../../config/prisma_client";

export class AdminCorrectPointRepository {
  async findById(id: string) {
    return prisma.attendance_points.findUnique({ where: { id } });
  }

  async getPolicy(employee_id: string) {
    return prisma.employee_attendance_policies.findUnique({
      where: { employee_id },
    });
  }

  async getScheduleForWeekday(employee_id: string, weekday: number) {
    return prisma.employee_schedules.findUnique({
      where: { employee_id_weekday: { employee_id, weekday } },
    });
  }

  async updateTimeAndAudit(
    id: string,
    data: {
      mark_time: Date;
      in_schedule: boolean;
      is_late: boolean;
      is_early: boolean;
      note: string;
    }
  ) {
    return prisma.attendance_points.update({
      where: { id },
      data: {
        mark_time: data.mark_time,
        is_manual: true,
        edited_at: new Date(),
        in_schedule: data.in_schedule,
        is_late: data.is_late,
        is_early: data.is_early,
        note: data.note,
      },
    });
  }
}
