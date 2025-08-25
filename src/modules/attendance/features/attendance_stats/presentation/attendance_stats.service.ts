// src/modules/attendance/features/attendance_stats/presentation/attendance_stats.service.ts
import { formatInTimeZone } from "date-fns-tz";
import { AttendanceStatsDTO } from "../domain/attendance_stats.dto";
import { AttendanceStatsRepository } from "../data/attendance_stats.repository";
import { TIMEZONE } from "../../../../../config/env";

const toDateTime = (date: string, time: string): Date => {
  const dateStr = `${date}T${time}`;
  console.log(`Creating date from: ${dateStr}`);
  const dateObj = new Date(dateStr);
  console.log(`Resulting date:`, dateObj);
  return dateObj;
};

const minutesBetween = (start: Date, end: Date): number => {
  const startTime = start.getTime();
  const endTime = end.getTime();

  if (isNaN(startTime) || isNaN(endTime)) {
    console.error("Invalid dates provided to minutesBetween:", { start, end });
    return 0;
  }

  return Math.abs((endTime - startTime) / 60000);
};

interface TransformedAttendanceRecord {
  date: string;
  records: {
    time: string;
    type: "entry" | "exit";
  }[];
}

const transformAttendanceData = (
  attendances: any[]
): TransformedAttendanceRecord[] => {
  // Agrupar registros por fecha
  const groupedByDate = attendances.reduce((acc, attendance) => {
    const onlyDate = attendance.date.toISOString().slice(0, 10);
    const checkTime = attendance.check_time.toISOString().slice(11, 19);
    const combinedUtc = new Date(`${onlyDate}T${checkTime}Z`);
    const date = formatInTimeZone(combinedUtc, TIMEZONE, "yyyy-MM-dd");
    const time = formatInTimeZone(combinedUtc, TIMEZONE, "HH:mm:ss");

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push({
      time,
      type: attendance.type.toLowerCase() as "entry" | "exit",
    });

    return acc;
  }, {} as Record<string, { time: string; type: "entry" | "exit" }[]>);

  // Convertir a array y ordenar registros por tiempo
  return Object.entries(groupedByDate).map(([date, records]) => ({
    date,
    records: (records as { time: string; type: "entry" | "exit" }[]).sort(
      (a, b) => a.time.localeCompare(b.time)
    ),
  }));
};

const calculateGrandTotalHours = (
  data: TransformedAttendanceRecord[]
): string => {
  let grandTotalMinutes = 0;

  for (const { date, records } of data) {
    let currentEntry: string | null = null;

    for (const record of records) {
      if (record.type === "entry") {
        currentEntry = record.time;
      } else if (record.type === "exit" && currentEntry) {
        try {
          const entryTime = toDateTime(date, currentEntry);
          const exitTime = toDateTime(date, record.time);

          console.log(
            `Entry: ${date}T${currentEntry}, Exit: ${date}T${record.time}`
          );
          console.log(`EntryTime object:`, entryTime);
          console.log(`ExitTime object:`, exitTime);

          if (!isNaN(entryTime.getTime()) && !isNaN(exitTime.getTime())) {
            const sessionMinutes = minutesBetween(entryTime, exitTime);
            console.log(`Session minutes: ${sessionMinutes}`);

            if (!isNaN(sessionMinutes) && sessionMinutes >= 0) {
              grandTotalMinutes += sessionMinutes;
            }
          }
        } catch (error) {
          console.error(`Error calculating time for ${date}:`, error);
        }

        currentEntry = null;
      }
    }
  }

  console.log(`Grand total minutes: ${grandTotalMinutes}`);

  if (isNaN(grandTotalMinutes) || grandTotalMinutes < 0) {
    return "0h 0m";
  }

  const hours = Math.floor(grandTotalMinutes / 60);
  const minutes = Math.round(grandTotalMinutes % 60);

  return `${hours}h ${minutes}m`;
};

export class AttendanceStatsService {
  constructor(private readonly repo = new AttendanceStatsRepository()) {}

  async execute(dto: AttendanceStatsDTO) {
    const result = await this.repo.findAttendanceData({
      employee_id: dto.employee_id,
      start_date: dto.start_date,
      end_date: dto.end_date,
    });

    // Transformar los datos para el cálculo de horas
    const transformedData = transformAttendanceData(result.attendances);

    // Calcular total de horas
    const totalHours = calculateGrandTotalHours(transformedData);

    return {
      total_registered_days: result.totalRegisteredDays,
      total_records: result.totalRecords,
      total_hours: totalHours,
      total_employees: result.totalEmployees,
    };
  }
}
