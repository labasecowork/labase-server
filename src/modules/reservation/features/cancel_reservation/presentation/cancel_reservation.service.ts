// src/modules/reservation/features/cancel_reservation/presentation/cancel_reservation.service.ts
import { CancelReservationRepository } from "../data/cancel_reservation.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import type { CurrentUser } from "../../../../../utils/authenticated_user";
import { Reservation } from "@prisma/client";

export class CancelReservationService {
  constructor(private readonly repo = new CancelReservationRepository()) {}

  async execute(id: string, user: CurrentUser, _reason?: string) {
    const reservation = await this.repo.findById(id);
    if (!reservation) {
      throw new AppError(
        "RESERVATION_NOT_FOUND",
        HttpStatusCodes.NOT_FOUND.code,
      );
    }

    const isAdmin = user.role === "admin";
    const isOwner = reservation.userId === user.id;

    if (!isAdmin && !isOwner) {
      throw new AppError(
        "RESERVATION_FORBIDDEN",
        HttpStatusCodes.FORBIDDEN.code,
      );
    }

    if (reservation.status === "CANCELLED") {
      throw new AppError(
        "RESERVATION_ALREADY_CANCELLED",
        HttpStatusCodes.CONFLICT.code,
      );
    }
    if (reservation.status === "IN_PROGRESS") {
      throw new AppError(
        "RESERVATION_IN_PROGRESS_CANNOT_CANCEL",
        HttpStatusCodes.CONFLICT.code,
      );
    }

    const allowed: Reservation["status"][] = ["PENDING", "CONFIRMED"];
    if (!allowed.includes(reservation.status)) {
      throw new AppError(
        "RESERVATION_STATUS_INVALID_FOR_CANCEL",
        HttpStatusCodes.CONFLICT.code,
      );
    }

    const updated = await this.repo.updateStatus(id, "CANCELLED");
    return {
      message: "Reservation cancelled successfully",
      reservation_id: updated.id,
      previous_status: reservation.status,
      status: updated.status,
    };
  }
}
