// src/modules/employee/features/create_employee/domain/create_employee.schema.ts
import { z } from "zod";

export const CreateEmployeeSchema = z.object({
  first_name: z.string().min(1, "El nombre es requerido"),
  last_name: z.string().min(1, "El apellido es requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  user_type: z.enum(["admin", "client", "employee"]).default("client"),
  profile_image: z.string().url().optional(),
  phone: z.string().optional(),
  birth_date: z.coerce.date().optional(),
  gender: z.string().optional(),
});
