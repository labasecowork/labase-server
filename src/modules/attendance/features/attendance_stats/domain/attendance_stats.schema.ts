import { z } from "zod";

export const AttendanceStatsSchema = z
  .object({
    employee_id: z.string().uuid().optional(),
    start_date: z.coerce.date().optional(),
    end_date: z.coerce.date().optional(),
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
