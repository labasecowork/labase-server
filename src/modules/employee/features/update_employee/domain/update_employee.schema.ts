// src/modules/employee/features/update_employee/domain/update_employee.schema.ts
import { z } from "zod";

export const UpdateEmployeeParamsSchema = z.object({
  id: z.string().uuid("ID de empleado debe ser un UUID válido"),
});

export const UpdateEmployeeBodySchema = z.object({
  first_name: z.string().min(1, "El nombre es requerido").optional(),
  last_name: z.string().min(1, "El apellido es requerido").optional(),
  email: z.string().email("Email inválido").optional(),
  password: z.string().refine((val) => val === "" || val.length >= 6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  user_type: z.enum(["employee"]).optional(),
  profile_image: z.string().url().optional(),
  phone: z.string().optional(),
  birth_date: z.coerce.date().optional(),
  gender: z.enum(["male", "female", "unspecified"]).optional(),
  status: z.enum(["active", "suspended", "pending"]).optional(),
  work_area_id: z.string().uuid().optional(),
  company_id: z.string().uuid().optional(),
});
