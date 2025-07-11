// src/modules/space/features/edit_space/domain/edit_space.schema.ts
import { z } from "zod";

export const EditSpaceSchema = z
  .object({
    name: z.string().min(3).max(120).optional(),
    description: z.string().max(500).optional(),
    capacityMin: z.number().int().positive().optional(),
    capacityMax: z.number().int().positive().optional(),
    access: z.enum(["PUBLIC", "PRIVATE"]).optional(),
    allowByUnit: z.boolean().optional(),
    allowFullRoom: z.boolean().optional(),
    benefitIds: z.array(z.string().uuid()).optional(),
  })
  .superRefine((d, ctx) => {
    if (d.capacityMin && d.capacityMax && d.capacityMax < d.capacityMin) {
      ctx.addIssue({
        code: "custom",
        message: "capacityMax debe ser mayor o igual a capacityMin",
        path: ["capacityMax"],
      });
    }
  });

export type EditSpaceDTO = z.infer<typeof EditSpaceSchema>;
