// src/modules/reservation/features/check_availability/domain/dtos/check_availability.schema.ts
import { z } from "zod";

export const CheckAvailabilitySchema = z
  .object({
    spaceId: z.string().uuid("spaceId must be a valid UUID"),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
  })
  .refine((d) => d.endTime > d.startTime, {
    message: "endTime must be later than startTime",
    path: ["endTime"],
  });
