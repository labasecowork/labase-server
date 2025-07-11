import { z } from "zod";

export const EditProfileSchema = z
  .object({
    firstName: z.string().trim().min(1).max(50).optional(),
    lastName: z.string().trim().min(1).max(50).optional(),
    phone: z.string().trim().min(6).max(20).optional(),
    birthDate: z.coerce.date().optional(),
    gender: z.enum(["M", "F", "O"]).optional(),
    password: z.string().min(6).optional(),
    confirmPassword: z.string().min(6).optional(),
  })
  .refine(
    d => (d.password ? d.confirmPassword === d.password : true),
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export type EditProfileDTO = z.infer<typeof EditProfileSchema>;
