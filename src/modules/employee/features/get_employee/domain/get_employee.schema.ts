// src/modules/employee/features/get_employee/domain/get_employee.schema.ts
import { z } from "zod";

export const GetEmployeeSchema = z.object({
  id: z.string().uuid("El ID del empleado debe ser un UUID válido"),
});
