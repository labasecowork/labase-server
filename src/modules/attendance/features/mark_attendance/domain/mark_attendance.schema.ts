// src/modules/attendance/features/mark_attendance/domain/mark_attendance.schema.ts
import { z } from "zod";

export const MarkAttendanceSchema = z.object({
  type: z.enum(["ENTRY", "EXIT"], {
    errorMap: () => ({ message: "El tipo debe ser ENTRY o EXIT" }),
  }),
});
