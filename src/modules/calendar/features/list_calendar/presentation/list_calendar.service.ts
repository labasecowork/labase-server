// src/modules/calendar/features/list_calendar/presentation/list_calendar.service.ts
import { ListCalendarDTO } from "../domain/list_calendar.schema";
import { ListCalendarRepository } from "../data/list_calendar.repository";
import { LoggedUser } from "../../../../user/features/edit_profile/presentation/edit_profile.service";

export class ListCalendarService {
  constructor(private readonly repo = new ListCalendarRepository()) {}

  async execute(user: LoggedUser, dto: ListCalendarDTO) {
    const isAdmin = user.user_type === "admin";
    if (dto.from || dto.to) {
      return this.repo.getEventsBetween(dto.from, dto.to, isAdmin ? undefined : user.id);
    }
    return this.repo.getWeeklyEvents(isAdmin ? undefined : user.id);
  }
}
