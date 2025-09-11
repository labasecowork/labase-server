import { z } from "zod";

export const ListMyAttendanceSchema = z
  .object({
    page: z.coerce
      .number({
        invalid_type_error: "La página debe ser un número",
      })
      .int("La página debe ser un número entero")
      .positive("La página debe ser mayor que 0")
      .default(1),

    limit: z.coerce
      .number({
        invalid_type_error: "El límite debe ser un número",
      })
      .int("El límite debe ser un número entero")
      .positive("El límite debe ser mayor que 0")
      .max(100, "El límite no puede ser mayor a 100")
      .default(10),

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

    type: z
      .enum(["entry", "exit"], {
        errorMap: () => ({
          message: "El tipo debe ser 'entry' o 'exit'",
        }),
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
