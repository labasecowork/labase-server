// src/modules/attendance/features/list_my_attendance/domain/list_my_attendance.schema.ts
import { z } from "zod";

export const ListMyAttendanceSchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    start_date: z.coerce.date().optional(),
    end_date: z.coerce.date().optional(),
    type: z.enum(["ENTRY", "EXIT"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.start_date && data.end_date && data.end_date < data.start_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "end_date debe ser posterior o igual a start_date",
        path: ["end_date"],
      });
    }
  });
