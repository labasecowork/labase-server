//src/modules/employee/features/create_config/domain/create_config.schema.ts
import { z } from "zod";

const time = z.string().regex(/^\d{2}:\d{2}$/, "Usa formato HH:mm");

export const CreateEmployeeConfigSchema = z
  .object({
    employee_id: z.string().uuid("ID de empleado inválido"),
    policy: z.object({
      grace_entry_minutes: z.number().int().min(0).default(5),
      early_before_minutes: z.number().int().min(0).default(15),
      exit_late_minutes: z.number().int().min(0).default(10),
      require_four_points: z.boolean().default(false),
      min_daily_hours: z.number().int().min(1).max(12).default(8),
    }),
    schedules: z
      .array(
        z.object({
          weekday: z.number().int().min(1).max(7),
          mode: z.enum(["onsite", "remote"]),
          expected_points: z
            .number()
            .int()
            .refine(
              (v) => v === 2 || v === 4,
              "expected_points debe ser 2 o 4"
            ),
          entry_time: time.optional(),
          lunch_out_time: time.optional(),
          lunch_in_time: time.optional(),
          exit_time: time.optional(),
          min_lunch_minutes: z.number().int().min(0).optional(),
        })
      )
      .min(1)
      .max(7),
  })
  .superRefine((data, ctx) => {
    const wds = new Set<number>();
    for (const s of data.schedules) {
      if (wds.has(s.weekday)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `weekday ${s.weekday} duplicado`,
          path: ["schedules"],
        });
        break;
      }
    }
  });
