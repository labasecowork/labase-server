// src/modules/reservation/features/check_availability/domain/dtos/check_availability.schema.ts
import { z } from "zod";

export const CheckAvailabilitySchema = z
  .object({
    space_id: z.string().uuid("space_id must be a valid UUID"),
    start_time: z.coerce.date(),
    end_time: z.coerce.date(),
    people: z.number().int().positive().optional().default(1),
    full_room: z.boolean().optional().default(false),
  })
  .superRefine((d, ctx) => {
    if (d.end_time <= d.start_time) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "end_time must be later than start_time",
        path: ["end_time"],
      });
    }
  });

export type CheckAvailabilityDTO = z.infer<typeof CheckAvailabilitySchema>;
