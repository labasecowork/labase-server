import { z } from "zod";

export const GetEmployeeSchema = z.object({
  id: z.string().uuid("El ID del empleado debe ser un UUID válido"),
});
