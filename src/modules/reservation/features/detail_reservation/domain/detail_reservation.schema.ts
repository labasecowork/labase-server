
import { z } from "zod";

export const DetailReservationParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid reservation ID"),
});
