//src/modules/attendance/features/mark_attendance/domain/mark_attendance.schema.ts
import { z } from "zod";

export const MarkAttendanceSchema = z.object({
  employee_id: z.string().uuid().optional(),
  request_mode: z.enum(["onsite","remote"]).default("onsite"),
  note: z.string().max(300).optional(),
});
export type MarkAttendanceDTO = z.infer<typeof MarkAttendanceSchema>;
