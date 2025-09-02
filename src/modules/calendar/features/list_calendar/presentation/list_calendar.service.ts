// src/modules/calendar/features/list_calendar/presentation/list_calendar.service.ts
import { ListCalendarDTO } from "../domain/list_calendar.schema";
import { ListCalendarRepository } from "../data/list_calendar.repository";
import { CurrentUser } from "../../../../../utils/authenticated_user";

export class ListCalendarService {
  constructor(private readonly repo = new ListCalendarRepository()) {}

  async execute(user: CurrentUser, dto: ListCalendarDTO) {
    if (dto.from || dto.to) {
      return this.repo.getEventsBetween(dto.from, dto.to, user.id);
    }

    return this.repo.getWeeklyEvents();
  }
}
