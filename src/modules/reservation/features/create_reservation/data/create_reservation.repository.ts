// src/modules/reservation/features/create_reservation/data/create_reservation.repository.ts
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export class CreateReservationRepository {
  findSpaceById(id: string) {                                  
    return prisma.space.findUnique({ where: { id } });
  }

  findOverlaps(spaceId: string, start: Date, end: Date) {       
    return prisma.reservation.findFirst({
      where: {
        spaceId,
        OR: [
          { startTime: { lt: end,   gte: start } },
          { endTime:   { gt: start, lte: end   } },
          { startTime: { lte: start }, endTime: { gte: end } },
        ],
      },
    });
  }

  create(data: Prisma.ReservationCreateInput) {
    return prisma.reservation.create({ data });
  }
}
