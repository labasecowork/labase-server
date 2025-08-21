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
import type { CurrentUser } from "../../../../../utils/authenticated_user";

/**
 * Reglas clave (alineadas a nuestras guías):
 * - Prisma SOLO en repos (CreateReservationRepository).
 * - Validación Zod en el controller (no aquí).
 * - Errores de dominio con AppError + HttpStatusCodes.
 * - Nada de Promise.all si hay dependencias (secuencial).
 * - Emite "RESERVATION_CREATED" por Socket.IO al finalizar.
 * - Admin crea reservas en estado CONFIRMED; client en PENDING.
 * - employee NO puede crear reservas (política explícita).
 */
export class CreateReservationService {
  constructor(private readonly repo = new CreateReservationRepository()) {}

  async execute(dto: CreateReservationDTO, user: CurrentUser) {
    // 0) Política de rol
    if (user.role === "employee") {
      throw new AppError(
        "USER_TYPE_NOT_ALLOWED",
        HttpStatusCodes.FORBIDDEN.code,
      );
    }

    // 1) Validaciones de existencia y estado del espacio
    const space = await this.repo.findSpaceById(dto.spaceId);
    if (!space || space.disabled) {
      throw new AppError(
        RESERVATION_MESSAGES.SPACE_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code,
      );
    }

    // 2) Reglas de capacidad / flags
    if (dto.people < space.capacityMin || dto.people > space.capacityMax) {
      throw new AppError(
        RESERVATION_MESSAGES.CAPACITY_OUT_OF_RANGE,
        HttpStatusCodes.BAD_REQUEST.code,
      );
    }
    if (dto.fullRoom && !space.allowFullRoom) {
      throw new AppError(
        RESERVATION_MESSAGES.FULL_ROOM_FORBIDDEN,
        HttpStatusCodes.BAD_REQUEST.code,
      );
    }
    if (!dto.fullRoom && !space.allowByUnit && space.type === "UNIT") {
      throw new AppError(
        RESERVATION_MESSAGES.UNIT_BOOKING_FORBIDDEN,
        HttpStatusCodes.BAD_REQUEST.code,
      );
    }

    // 3) Solapamiento / capacidad restante (según modo)
    if (dto.fullRoom) {
      const overlap = await this.repo.findOverlaps(
        dto.spaceId,
        dto.startTime,
        dto.endTime,
      );
      if (overlap) {
        throw new AppError(
          RESERVATION_MESSAGES.TIME_OVERLAP,
          HttpStatusCodes.CONFLICT.code,
        );
      }
    } else {
      const booked = await this.repo.sumPeople(
        dto.spaceId,
        dto.startTime,
        dto.endTime,
      );
      if (booked + dto.people > space.capacityMax) {
        throw new AppError(
          RESERVATION_MESSAGES.NO_CAPACITY_LEFT,
          HttpStatusCodes.CONFLICT.code,
        );
      }
    }

    // 4) Cálculo de precio (elige la mejor unidad disponible según duración)
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
        HttpStatusCodes.BAD_REQUEST.code,
      );
    }

    const rate = findRate(
      months >= 1 ? "MONTH" : weeks >= 1 ? "WEEK" : days >= 1 ? "DAY" : "HOUR",
    )!;

    const price =
      mode === "INDIVIDUAL" ? unitCount * rate * dto.people : unitCount * rate;

    // 5) Estado inicial según rol
    const status: Reservation["status"] =
      user.role === "admin" ? "CONFIRMED" : "PENDING";

    // 6) PurchaseNumber (numérico secuencial simple)
    const purchaseNumber = (await this.repo.countReservationsAll()) + 1;

    // 7) Crear reserva
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
      purchaseNumber: purchaseNumber.toString(),
    });

    // 8) Emitir evento de socket (actualización tiempo real)
    io.emit("RESERVATION_CREATED", {
      reservationId: created.id,
      userId: user.id,
      startTime: dto.startTime,
      endTime: dto.endTime,
      spaceId: dto.spaceId,
    });

    // 9) Respuesta DTO
    return {
      message: RESERVATION_MESSAGES.CREATED_SUCCESS,
      reservation_id: created.id,
      codeQr: created.codeQr,
      price,
      status: created.status,
    };
  }
}
