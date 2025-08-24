// src/modules/space/features/create_space/domain/create_space.schema.ts
import { z } from "zod";
import { duration_unit, price_mode } from "@prisma/client";

export const CreateSpaceSchema = z
  .object({
    name: z.string().min(3).max(120),

    description: z
      .string()
      .max(500, "La descripción no debe exceder 500 caracteres")
      .optional(),

    type: z.enum(["unit", "shared_site", "full_room"]),

    capacityMin: z.number().int().positive(),
    capacityMax: z.number().int().positive(),

    allowByUnit: z.boolean().optional().default(false),
    allowFullRoom: z.boolean().optional().default(false),

    access: z.enum(["public", "private"]).optional().default("public"),

    prices: z
      .array(
        z.object({
          unit: z.nativeEnum(duration_unit),
          mode: z.nativeEnum(price_mode),
          value: z.number().positive(),
        }),
      )
      .min(1, "Debe proveer al menos un precio"),

    benefitIds: z.array(z.string().uuid()).optional().default([]),
  })
  .superRefine((data, ctx) => {
    if (data.capacityMax < data.capacityMin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "capacityMax debe ser mayor o igual a capacityMin",
        path: ["capacityMax"],
      });
    }
  });
