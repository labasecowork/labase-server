// src/modules/attendance/features/mark_attendance/domain/mark_attendance.dto.ts
import { z } from "zod";
import { MarkAttendanceSchema } from "./mark_attendance.schema";

export type MarkAttendanceDTO = z.infer<typeof MarkAttendanceSchema>;

export interface MarkAttendanceResponseDTO {
  message: string;
  attendance_id: string;
  type: "entry" | "exit";
  date: string;
  check_time: string;
}
