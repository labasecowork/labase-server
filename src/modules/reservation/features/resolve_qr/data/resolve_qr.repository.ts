// src/modules/reservation/features/resolve_qr/data/resolve_qr.repository.ts
import prisma from "../../../../../config/prisma_client";
import { ReservationStatus } from "@prisma/client"; 

export class ResolveQrRepository {
  findReservationByCode(code: string) {
    return prisma.reservation.findUnique({
      where: { codeQr: code },
      include: { space: true, user: true },
    });
  }

  markAsInProgress(reservationId: string) {
    return prisma.reservation.update({
      where: { id: reservationId },
      data:  { status: ReservationStatus.IN_PROGRESS },
    });
  }
}
