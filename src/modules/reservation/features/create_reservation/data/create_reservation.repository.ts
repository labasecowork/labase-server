// src/modules/reservation/features/create_reservation/data/create_reservation.repository.ts
import { PrismaClient, Prisma, Reservation } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class CreateReservationRepository {
  findSpaceById(id: string) {
    return prisma.space.findUnique({
      where: { id },
      include: { prices: true },
    });
  }

  findOverlaps(spaceId: string, start: Date, end: Date) {
    return prisma.reservation.findFirst({
      where: {
        spaceId,
        OR: [
          { startTime: { lt: end, gte: start } },
          { endTime: { gt: start, lte: end } },
          { startTime: { lte: start }, endTime: { gte: end } },
        ],
      },
    });
  }

  sumPeople(spaceId: string, start: Date, end: Date) {
    return prisma.reservation
      .aggregate({
        _sum: { people: true },
        where: {
          spaceId,
          startTime: { lt: end },
          endTime: { gt: start },
        },
      })
      .then((result) => result._sum.people ?? 0);
  }

  create(data: Prisma.ReservationCreateInput) {
    return prisma.reservation.create({ data });
  }

  async findById(id: string): Promise<Reservation | null> {
    return prisma.reservation.findUnique({
      where: { id },
    });
  }

  async updateStatus(
    id: string,
    status: Reservation["status"],
  ): Promise<Reservation> {
    return prisma.reservation.update({
      where: { id },
      data: { status },
    });
  }

  countReservations(spaceId: string) {
    return prisma.reservation.count({
      where: { spaceId },
    });
  }

  countReservationsAll() {
    return prisma.reservation.count();
  }
}
