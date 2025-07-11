// src/modules/reservation/features/create_reservation/presentation/create_reservation.service.ts
import { CreateReservationDTO } from "../domain/create_reservation.dto";
import { CreateReservationRepository } from "../data/create_reservation.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { RESERVATION_MESSAGES } from "../../../../../constants/messages/reservation";
import { generateQrCode } from "../../../../../utils/generate_qr_code";

interface CurrentUser {
  id: string;
  role: "client" | "admin";
}

export class CreateReservationService {
  constructor(private readonly repo = new CreateReservationRepository()) {}

  async execute(dto: CreateReservationDTO, user: CurrentUser) {
    const space = await this.repo.findSpaceById(dto.spaceId);
    if (!space || space.disabled) {
      throw new AppError(
        RESERVATION_MESSAGES.SPACE_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    if (dto.people < space.capacityMin || dto.people > space.capacityMax) {
      throw new AppError(
        RESERVATION_MESSAGES.CAPACITY_OUT_OF_RANGE,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    if (dto.fullRoom && !space.allowFullRoom) {
      throw new AppError(
        RESERVATION_MESSAGES.FULL_ROOM_FORBIDDEN,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }
    if (!dto.fullRoom && !space.allowByUnit && space.type === "UNIT") {
      throw new AppError(
        RESERVATION_MESSAGES.UNIT_BOOKING_FORBIDDEN,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    const overlap = await this.repo.findOverlaps(
      dto.spaceId,
      dto.startTime,
      dto.endTime
    );
    if (overlap) {
      throw new AppError(
        RESERVATION_MESSAGES.TIME_OVERLAP,
        HttpStatusCodes.CONFLICT.code
      );
    }

    const codeQr = generateQrCode();

    const created = await this.repo.create({
      space: { connect: { id: dto.spaceId } },
      user: { connect: { id: user.id } },
      startTime: dto.startTime,
      endTime: dto.endTime,
      people: dto.people,
      fullRoom: dto.fullRoom,
      codeQr,
    });

    return {
      message: RESERVATION_MESSAGES.CREATED_SUCCESS,
      reservation_id: created.id,
      codeQr: created.codeQr,
    };
  }
}
