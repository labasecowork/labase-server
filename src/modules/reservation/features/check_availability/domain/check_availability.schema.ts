// src/modules/reservation/features/check_availability/domain/dtos/check_availability.schema.ts
import { z } from "zod";

export const CheckAvailabilitySchema = z
  .object({
    space_id: z.string().uuid("space_id must be a valid UUID"),
    start_time: z.coerce.date(),
    end_time: z.coerce.date(),
  })
  .refine((d) => d.end_time > d.start_time, {
    message: "end_time must be later than start_time",
    path: ["end_time"],
  });
