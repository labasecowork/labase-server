// src/modules/reservation/features/resolve_qr/presentation/resolve_qr.service.ts
import { ResolveQrDTO } from "../domain/resolve_qr.dto";
import { ResolveQrRepository } from "../data/resolve_qr.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class ResolveQrService {
  constructor(private readonly repo = new ResolveQrRepository()) {}
  async execute(dto: ResolveQrDTO) {
    const reservation = await this.repo.findReservationByCode(dto.code);
    if (!reservation) {
      throw new AppError(
        "Reserva no encontrada",
        HttpStatusCodes.NOT_FOUND.code
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
