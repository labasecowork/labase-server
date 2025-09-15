import prisma from "../../../../../config/prisma_client";
import { reservation_status } from "@prisma/client";

export class ListMyReservationsRepository {
  list(user_id: string, skip: number, take: number) {
    return prisma.reservation.findMany({
      where: {
        user_id,
        status: {
          in: [reservation_status.pending, reservation_status.in_progress],
        },
      },
      orderBy: { start_time: "desc" },
      include: {
        space: {
          select: {
            name: true,
            space_images: true,
          },
        },
      },
      skip,
      take,
    });
  }
}
