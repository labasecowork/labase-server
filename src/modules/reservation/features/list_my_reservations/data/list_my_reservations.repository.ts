// src/modules/reservation/features/list_my_reservations/repository/list_my_reservations.repository.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ListMyReservationsRepository {
  list(userId: string, skip: number, take: number) {
    return prisma.reservation.findMany({
      where: { userId },
      orderBy: { startTime: "desc" },
      skip,
      take,
    });
  }
}
