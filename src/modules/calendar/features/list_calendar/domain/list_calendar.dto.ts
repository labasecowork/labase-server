// src/modules/calendar/features/list_calendar/domain/list_calendar.dto.ts
import { z } from "zod";
import { ListCalendarSchema } from "./list_calendar.schema";

export type ListCalendarDTO = z.infer<typeof ListCalendarSchema>;
