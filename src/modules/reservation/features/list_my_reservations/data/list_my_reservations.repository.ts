import prisma from "../../../../../config/prisma_client";
import { reservation_status } from "@prisma/client";

export class ListMyReservationsRepository {
  async list(user_id: string, skip: number, take: number) {
    console.log(user_id);

    const data = await prisma.reservation.findMany({
      where: {
        user_id,
        status: {
          in: [
            reservation_status.pending,
            reservation_status.in_progress,
            reservation_status.confirmed,
            reservation_status.cancelled,
          ],
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
    console.log(data);
    return data;
  }
}
