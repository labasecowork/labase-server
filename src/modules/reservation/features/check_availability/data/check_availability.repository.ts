// src/modules/reservation/features/check_availability/data/check_availability.repository.ts
import prisma from "../../../../../config/prisma_client";

export class CheckAvailabilityRepository {
  findOverlaps(space_id: string, start: Date, end: Date) {
    return prisma.reservation.findFirst({
      where: {
        space_id,
        OR: [
          { start_time: { lt: end, gte: start } },
          { end_time: { gt: start, lte: end } },
          { start_time: { lte: start }, end_time: { gte: end } },
        ],
      },
      select: { id: true },
    });
  }
}
