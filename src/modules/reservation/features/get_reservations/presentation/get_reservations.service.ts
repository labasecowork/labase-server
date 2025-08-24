// src/modules/reservation/features/get_reservations/presentation/get_reservations.service.ts
import { Prisma } from "@prisma/client";
import { GetReservationsDTO } from "../domain/get_reservations.dto";
import { GetReservationsRepository } from "../data/get_reservations.repository";

export class GetReservationsService {
  constructor(private readonly repo = new GetReservationsRepository()) {}

  async execute(dto: GetReservationsDTO) {
    const { page = 1, limit = 10, from, to, spaceId, fullRoom } = dto;

    // Prisma usa snake_case
    const where: Prisma.reservationWhereInput = {
      ...(spaceId && { space_id: spaceId }),
      ...(fullRoom !== undefined && { full_room: fullRoom }),
      ...(from || to
        ? {
            start_time: {
              ...(from && { gte: new Date(from) }),
              ...(to && { lte: new Date(to) }),
            },
          }
        : {}),
    };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.repo.findMany({
        where,
        include: {
          user: { select: { first_name: true, last_name: true } },
          space: { select: { name: true } },
        },
        orderBy: { start_time: "desc" },
        skip,
        take: limit,
      }),
      this.repo.count(where),
    ]);

    const pages = Math.ceil(total / limit);

    return {
      data,
      page,
      limit,
      total,
      pages,
      hasNext: page < pages,
      hasPrev: page > 1,
      nextPage: page < pages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };
  }
}
