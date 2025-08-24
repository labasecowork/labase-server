// src/modules/attendance/features/mark_attendance/domain/mark_attendance.schema.ts
import { z } from "zod";

export const MarkAttendanceSchema = z.object({
  type: z.enum(["entry", "exit"], {
    errorMap: () => ({ message: "El tipo debe ser ´entry´ o ´exit´" }),
  }),
});
