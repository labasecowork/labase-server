import { z } from "zod";

export const MarkAttendanceSchema = z.object({
  type: z.enum(["entry", "exit"], {
    errorMap: () => ({ message: "El tipo debe ser ´entry´ o ´exit´" }),
  }),
});
