import { z } from "zod";

export const AttendanceStatsSchema = z
  .object({
    employee_id: z
      .string({
        invalid_type_error: "El ID del empleado debe ser una cadena (UUID)",
      })
      .uuid("El ID del empleado debe ser un UUID válido")
      .optional(),

    start_date: z.coerce
      .date({
        invalid_type_error: "La fecha de inicio debe ser una fecha válida",
      })
      .optional(),

    end_date: z.coerce
      .date({
        invalid_type_error: "La fecha de fin debe ser una fecha válida",
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.start_date && data.end_date && data.end_date < data.start_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "La fecha de fin debe ser posterior o igual a la fecha de inicio",
        path: ["end_date"],
      });
    }
  });
