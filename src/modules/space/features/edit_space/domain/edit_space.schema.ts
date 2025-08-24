// src/modules/space/features/edit_space/domain/edit_space.schema.ts
import { z } from "zod";

export const EditSpaceSchema = z
  .object({
    name: z.string().min(3).max(120).optional(),
    description: z.string().max(500).optional(),

    type: z.enum(["unit", "shared_site", "full_room"]).optional(),
    access: z.enum(["public", "private"]).optional(),

    capacityMin: z.number().int().positive().optional(),
    capacityMax: z.number().int().positive().optional(),

    allowByUnit: z.boolean().optional(),
    allowFullRoom: z.boolean().optional(),

    disabled: z.boolean().optional(),

    benefitIds: z.array(z.string().uuid()).optional(),
  })
  .superRefine((d, ctx) => {
    if (d.capacityMin && d.capacityMax && d.capacityMax < d.capacityMin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "capacityMax must be greater than or equal to capacityMin",
        path: ["capacityMax"],
      });
    }
  });

export type EditSpaceDTO = z.infer<typeof EditSpaceSchema>;
