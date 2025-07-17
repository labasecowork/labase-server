// src/modules/calendar/features/list_calendar/domain/list_calendar.schema.ts
import { z } from "zod";

export const ListCalendarSchema = z.object({
  from: z.string().datetime().optional(),
  to:   z.string().datetime().optional(),
});
export type ListCalendarDTO = z.infer<typeof ListCalendarSchema>;
