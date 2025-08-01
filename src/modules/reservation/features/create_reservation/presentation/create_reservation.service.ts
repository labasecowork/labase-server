// src/modules/reservation/features/create_reservation/presentation/create_reservation.service.ts
import {
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";
import { CreateReservationDTO } from "../domain/create_reservation.dto";
import { CreateReservationRepository } from "../data/create_reservation.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { RESERVATION_MESSAGES } from "../../../../../constants/messages/reservation";
import { generateQrCode } from "../../../../../utils/generate_qr_code";
import { io } from "../../../../../config/socket";
import { Reservation } from "@prisma/client";

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

    if (dto.fullRoom) {
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
    } else {
      const booked = await this.repo.sumPeople(
        dto.spaceId,
        dto.startTime,
        dto.endTime
      );
      if (booked + dto.people > space.capacityMax) {
        throw new AppError(
          RESERVATION_MESSAGES.NO_CAPACITY_LEFT,
          HttpStatusCodes.CONFLICT.code
        );
      }
    }

    const mode = dto.fullRoom ? "GROUP" : "INDIVIDUAL";
    const prices = (
      space.prices as Array<{
        duration: "HOUR" | "DAY" | "WEEK" | "MONTH";
        amount: number;
        mode: "INDIVIDUAL" | "GROUP";
      }>
    ).filter((p) => p.mode === mode);

    const months = differenceInMonths(dto.endTime, dto.startTime);
    const weeks = differenceInWeeks(dto.endTime, dto.startTime);
    const days = differenceInDays(dto.endTime, dto.startTime);
    const hours = differenceInHours(dto.endTime, dto.startTime);

    const findRate = (unit: (typeof prices)[number]["duration"]) =>
      prices.find((p) => p.duration === unit)?.amount ?? null;

    let unitCount: number;
    if (months >= 1 && findRate("MONTH") !== null) {
      unitCount = months;
    } else if (weeks >= 1 && findRate("WEEK") !== null) {
      unitCount = weeks;
    } else if (days >= 1 && findRate("DAY") !== null) {
      unitCount = days;
    } else if (findRate("HOUR") !== null) {
      unitCount = hours;
    } else {
      throw new AppError(
        RESERVATION_MESSAGES.PRICE_NOT_DEFINED,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    const rate = findRate(
      months >= 1 ? "MONTH" : weeks >= 1 ? "WEEK" : days >= 1 ? "DAY" : "HOUR"
    )!;

    const price =
      mode === "INDIVIDUAL" ? unitCount * rate * dto.people : unitCount * rate;

    const status: Reservation["status"] =
      user.role === "admin" ? "CONFIRMED" : "PENDING";

    const codeQr = generateQrCode();
    const created = await this.repo.create({
      space: { connect: { id: dto.spaceId } },
      user: { connect: { id: user.id } },
      startTime: dto.startTime,
      endTime: dto.endTime,
      people: dto.people,
      fullRoom: dto.fullRoom,
      codeQr,
      price,
      status,
    });

    io.emit("RESERVATION_CREATED", {
      reservationId: created.id,
      userId: user.id,
      startTime: dto.startTime,
      endTime: dto.endTime,
      spaceId: dto.spaceId,
    });

    return {
      message: RESERVATION_MESSAGES.CREATED_SUCCESS,
      reservation_id: created.id,
      codeQr: created.codeQr,
      price,
      status: created.status,
    };
  }
}
