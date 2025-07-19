import { z } from "zod";

export const publicContactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  reason: z.string().min(1),
  message: z.string().min(1),
});
