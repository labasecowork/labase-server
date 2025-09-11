import prisma from "../../../../../config/prisma_client";

interface FindAttendanceStatsParams {
  employee_id?: string;
  start_date?: Date;
  end_date?: Date;
}

export class AttendanceStatsRepository {
  async findAttendanceData(params: FindAttendanceStatsParams) {
    const { employee_id, start_date, end_date } = params;

    const where = {
      ...(employee_id && { employee_id }),
      ...((start_date || end_date) && {
        date: {
          ...(start_date && { gte: start_date }),
          ...(end_date && { lte: end_date }),
        },
      }),
    };

    // Obtener todos los registros de asistencia
    const attendances = await prisma.attendance.findMany({
      where,
      orderBy: [{ date: "asc" }, { check_time: "asc" }],
      select: {
        date: true,
        check_time: true,
        type: true,
        employee_id: true,
      },
    });

    // Obtener días únicos registrados
    const uniqueDays = await prisma.attendance.findMany({
      where,
      distinct: ["date"],
      select: {
        date: true,
      },
    });

    // Obtener empleados únicos
    const uniqueEmployees = await prisma.attendance.findMany({
      where,
      distinct: ["employee_id"],
      select: {
        employee_id: true,
      },
    });

    // Contar total de registros
    const totalRecords = await prisma.attendance.count({ where });

    return {
      attendances,
      totalRegisteredDays: uniqueDays.length,
      totalEmployees: uniqueEmployees.length,
      totalRecords,
    };
  }
}
