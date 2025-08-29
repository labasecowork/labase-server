import { z } from "zod";

export const VerifyCodePasswordResetSchema = z.object({
  code: z
    .string({
      required_error: "El código de verificación es obligatorio",
    })
    .max(4, "El código de verificación debe tener exactamente 4 caracteres")
    .min(4, "El código de verificación debe tener exactamente 4 caracteres")
    .trim(),
  email: z
    .string({
      required_error: "El correo electrónico es obligatorio",
    })
    .email(
      "El formato del correo electrónico no es válido, revisa que esté escrito correctamente"
    )
    .trim(),
});
