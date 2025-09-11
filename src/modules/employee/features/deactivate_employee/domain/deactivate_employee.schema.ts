import { z } from "zod";

export const DeactivateEmployeeParamsSchema = z.object({
  id: z.string().uuid("ID de empleado debe ser un UUID válido"),
});
