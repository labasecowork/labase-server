import { z } from "zod";
import { AttendanceStatsSchema } from "./attendance_stats.schema";

export type AttendanceStatsDTO = z.infer<typeof AttendanceStatsSchema>;

export interface AttendanceRecord {
  date: string;
  time: string;
  type: "entry" | "exit";
}

export interface AttendanceStatsResponseDTO {
  total_registered_days: number;
  total_records: number;
  total_hours: string;
  total_employees: number;
}
