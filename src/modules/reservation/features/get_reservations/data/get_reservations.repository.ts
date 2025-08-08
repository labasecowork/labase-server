// src/modules/reservation/features/get_reservations/data/get_reservations.repository.ts
import {Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class GetReservationsRepository {
  findMany(args: Prisma.ReservationFindManyArgs) {
    return prisma.reservation.findMany(args);
  }
  count(where: Prisma.ReservationWhereInput) {
    return prisma.reservation.count({ where });
  }
}
