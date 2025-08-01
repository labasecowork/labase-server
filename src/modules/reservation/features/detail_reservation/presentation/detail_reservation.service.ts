import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { LoggedUser } from "../../../../user/features/edit_profile/presentation/edit_profile.service";
import { DetailReservationRepository } from "../data/detail_reservation.repository";

export class DetailReservationService {
  constructor(private readonly repo = new DetailReservationRepository()) {}

  async execute(user: LoggedUser, reservationId: string) {
    const reservation = await this.repo.findById(reservationId);
    if (!reservation) {
      throw new AppError(
        "RESERVATION_NOT_FOUND",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const isOwner = reservation.userId === user.id;
    const isAdmin = user.user_type === "admin";

    if (!isOwner && !isAdmin) {
      throw new AppError("FORBIDDEN", HttpStatusCodes.FORBIDDEN.code);
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
