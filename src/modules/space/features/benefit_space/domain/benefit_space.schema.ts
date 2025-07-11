// src/modules/space/features/benefit/domain/dtos/benefit_space.schema.ts
import { z } from "zod";

export const CreateBenefitSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(255).optional(),
});
