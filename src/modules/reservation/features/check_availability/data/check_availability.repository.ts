// src/modules/reservation/features/check_availability/data/check_availability.repository.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class CheckAvailabilityRepository {
  findOverlaps(spaceId: string, start: Date, end: Date) {
    return prisma.reservation.findFirst({
      where: {
        spaceId,
        OR: [
          { startTime: { lt: end, gte: start } },
          { endTime:   { gt: start, lte: end } },
          { startTime: { lte: start }, endTime: { gte: end } },
        ],
      },
      select: { id: true },
    });
  }
}
