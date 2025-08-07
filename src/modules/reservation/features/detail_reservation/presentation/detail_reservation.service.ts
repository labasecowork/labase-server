// src/modules/reservation/features/detail_reservation/presentation/detail_reservation.service.ts
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { RESERVATION_MESSAGES } from "../../../../../constants/messages/reservation";
import { DetailReservationRepository } from "../data/detail_reservation.repository";
import { CurrentUser } from "../../../../../utils/authenticated_user";

export class DetailReservationService {
  constructor(private readonly repo = new DetailReservationRepository()) {}

  async execute(user: CurrentUser, reservationId: string) {
    const reservation = await this.repo.findById(reservationId);
    if (!reservation) {
      throw new AppError(
        RESERVATION_MESSAGES.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const isOwner = reservation.user.id === user.id;
    const isAdmin = user.role === "admin";

    if (!isOwner && !isAdmin) {
      throw new AppError(
        RESERVATION_MESSAGES.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const now = new Date();
    const status =
      now < reservation.startTime
        ? "upcoming"
        : now > reservation.endTime
        ? "expired"
        : "in_progress";

    return { reservation, status };
  }
}
