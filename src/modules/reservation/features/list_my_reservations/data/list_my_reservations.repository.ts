// src/modules/reservation/features/list_my_reservations/repository/list_my_reservations.repository.ts
import prisma from "../../../../../config/prisma_client";

export class ListMyReservationsRepository {
  list(userId: string, skip: number, take: number) {
    return prisma.reservation.findMany({
      where: { userId },
      orderBy: { startTime: "desc" },
      include: {
        space: {
          select: {
            name: true,
            images: true,
          },
        },
      },
      skip,
      take,
    });
  }
}
