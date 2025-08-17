// src/modules/reservation/features/cancel_reservation/data/cancel_reservation.repository.ts
import prisma from "../../../../../config/prisma_client";
import { Reservation } from "@prisma/client";

export class CancelReservationRepository {
  findById(id: string) {
    return prisma.reservation.findUnique({ where: { id } });
  }

  updateStatus(id: string, status: Reservation["status"]) {
    return prisma.reservation.update({
      where: { id },
      data: { status },
    });
  }
}
