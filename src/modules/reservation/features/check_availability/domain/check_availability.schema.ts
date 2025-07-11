// src/modules/reservation/features/check_availability/domain/dtos/check_availability.schema.ts
import { z } from "zod";

export const CheckAvailabilitySchema = z
  .object({
    spaceId: z.string().uuid("spaceId debe ser un UUID válido"),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
  })
  .refine((d) => d.endTime > d.startTime, {
    message: "endTime debe ser posterior a startTime",
    path: ["endTime"],
  });
