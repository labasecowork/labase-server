// src/modules/reservation/features/create_reservation/domain/dtos/create_reservation.schema.ts
import { z } from "zod";

export const CreateReservationSchema = z
  .object({
    spaceId: z.string().uuid("spaceId debe ser un UUID válido"),
    startTime: z.coerce.date(),
    endTime:   z.coerce.date(),
    people:    z.number().int().positive(),
    fullRoom:  z.boolean().optional().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.endTime <= data.startTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "endTime debe ser posterior a startTime",
        path: ["endTime"],
      });
    }
  });
