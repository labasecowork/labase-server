import { z } from "zod";

export const ListAllAttendanceSchema = z
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

    type: z
      .enum(["ENTRY", "EXIT"], {
        errorMap: () => ({
          message: "El tipo debe ser 'ENTRY' o 'EXIT'",
        }),
      })
      .optional(),

    search: z
      .string({
        invalid_type_error: "El parámetro de búsqueda debe ser texto",
      })
      .optional(),

    work_area_id: z
      .string({
        invalid_type_error:
          "El ID del área de trabajo debe ser una cadena (UUID)",
      })
      .uuid("El ID del área de trabajo debe ser un UUID válido")
      .optional(),

    company_id: z
      .string({
        invalid_type_error: "El ID de la empresa debe ser una cadena (UUID)",
      })
      .uuid("El ID de la empresa debe ser un UUID válido")
      .optional(),

    all: z
      .string()
      .optional()
      .transform((val) => val === "true")
      .pipe(
        z.boolean({
          invalid_type_error: "El parámetro 'all' debe ser 'true' o 'false'",
        })
      )
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
