// src/modules/reservation/features/get_reservations/data/get_reservations.repository.ts
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export class GetReservationsRepository {
  findMany(args: Prisma.ReservationFindManyArgs) {
    return prisma.reservation.findMany(args);
  }
  count(where: Prisma.ReservationWhereInput) {
    return prisma.reservation.count({ where });
  }
}
