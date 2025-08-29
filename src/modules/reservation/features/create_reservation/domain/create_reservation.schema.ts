// src/modules/reservation/features/create_reservation/domain/create_reservation.schema.ts
import { z } from "zod";

export const CreateReservationSchema = z
  .object({
    space_id: z.string().uuid("space_id must be a valid UUID"),
    start_time: z.coerce.date(),
    end_time: z.coerce.date(),
    people: z.number().int().positive(),
    full_room: z.boolean().optional().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.end_time <= data.start_time) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "endTime must be later than startTime",
        path: ["end_time"],
      });
    }

    const diffMs = data.end_time.getTime() - data.start_time.getTime();
    const oneHourMs = 60 * 60 * 1000;
    if (diffMs < oneHourMs) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The minimum reservation duration must be 1 hour",
        path: ["end_time"],
      });
    }

    // Prevent reservations in the past (5-minute margin)
    const now = Date.now() - 5 * 60 * 1000;
    if (data.start_time.getTime() < now) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "start_time cannot be in the past",
        path: ["start_time"],
      });
    }
  });
