//src/modules/auth/features/registration/verify_code_registration/domain/verify_code_registration.schema.ts
import { z } from "zod";

export const VerifyCodeRegistrationSchema = z.object({
  code: z
    .string({
      required_error: "Verification code is required",
    })
    .trim(),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format")
    .trim(),
});
