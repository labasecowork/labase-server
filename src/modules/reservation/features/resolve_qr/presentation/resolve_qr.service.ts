// src/modules/reservation/features/resolve_qr/presentation/resolve_qr.service.ts

import { ResolveQrDTO } from "../domain/resolve_qr.dto";
import { ResolveQrRepository } from "../data/resolve_qr.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { ReservationStatus } from "@prisma/client";

export class ResolveQrService {
  constructor(private readonly repo = new ResolveQrRepository()) {}

  async execute(dto: ResolveQrDTO) {
    const reservation = await this.repo.findReservationByCode(dto.code);
    if (!reservation) {
      throw new AppError("RESERVATION_NOT_FOUND", HttpStatusCodes.NOT_FOUND.code);
    }

    const now = new Date();
    let status: "upcoming" | "expired" | "in_progress";

    if (now < reservation.startTime) {
      status = "upcoming";
    } else if (now > reservation.endTime) {
      status = "expired";
    } else {
      status = "in_progress";

      if (reservation.status === ReservationStatus.CONFIRMED) {
        await this.repo.markAsInProgress(reservation.id);
        reservation.status = ReservationStatus.IN_PROGRESS; 
      }
    }

    return { reservation, status };
  }
}
