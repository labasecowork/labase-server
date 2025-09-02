// src/modules/visitor/features/edit_visitor/domain/edit_visitor.schema.ts
import { z } from "zod";

export const EditVisitorSchema = z.object({
  phone: z
    .string({
      invalid_type_error: "El teléfono debe ser una cadena (string)",
    })
    .optional(),

  email: z
    .string({
      invalid_type_error: "El correo electrónico debe ser una cadena (string)",
    })
    .email("El formato del correo electrónico no es válido")
    .optional(),

  exit_time: z
    .string({
      invalid_type_error: "La hora de salida debe ser una cadena (string)",
    })
    .datetime(
      "La hora de salida debe estar en formato ISO válido (ej.: 2024-01-31T13:45:00Z)"
    )
    .optional(),

  space_id: z
    .string({
      invalid_type_error: "El ID del espacio debe ser una cadena (UUID)",
    })
    .uuid("El ID del espacio debe ser un UUID válido")
    .optional(),
});
