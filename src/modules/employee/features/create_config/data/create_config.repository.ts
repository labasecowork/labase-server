//src/modules/employee/features/create_config/data/create_config.repository.ts
import prisma from "../../../../../config/prisma_client";

export class CreateEmployeeConfigRepository {
  async ensureEmployeeExists(employee_id: string) {
    return prisma.employee_details.findUnique({ where: { employee_id } });
  }

  async upsertPolicy(
    employee_id: string,
    data: {
      grace_entry_minutes: number;
      early_before_minutes: number;
      exit_late_minutes: number;
      require_four_points: boolean;
      min_daily_hours: number;
    }
  ) {
    return prisma.employee_attendance_policies.upsert({
      where: { employee_id },
      create: { employee_id, ...data },
      update: { ...data },
    });
  }

  async replaceAllSchedules(
    employee_id: string,
    rows: Array<{
      weekday: number;
      mode: "onsite" | "remote";
      expected_points: number;
      entry_time: Date | null;
      lunch_out_time: Date | null;
      lunch_in_time: Date | null;
      exit_time: Date | null;
      min_lunch_minutes: number | null;
    }>
  ) {
    await prisma.employee_schedules.deleteMany({ where: { employee_id } });
    if (!rows.length) return { count: 0 };
    return prisma.employee_schedules.createMany({
      data: rows.map((r) => ({ employee_id, ...r })),
      skipDuplicates: true,
    });
  }
}
