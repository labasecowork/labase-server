// src/modules/reservation/features/create_reservation/domain/dtos/create_reservation.schema.ts
import { z } from "zod";

export const CreateReservationSchema = z
  .object({
    spaceId: z.string().uuid("spaceId must be a valid UUID"),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    people: z.number().int().positive(),
    fullRoom: z.boolean().optional().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.endTime <= data.startTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "endTime must be later than startTime",
        path: ["endTime"],
      });
    }

    const diffMs = data.endTime.getTime() - data.startTime.getTime();
    const oneHourMs = 60 * 60 * 1000;
    if (diffMs < oneHourMs) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The minimum reservation duration must be 1 hour",
        path: ["endTime"],
      });
    }

    // Prevent reservations in the past (5-minute margin)
    const now = Date.now() - 5 * 60 * 1000;
    if (data.startTime.getTime() < now) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "startTime cannot be in the past",
        path: ["startTime"],
      });
    }
  });
