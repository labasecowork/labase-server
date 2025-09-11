import prisma from "../../../../../config/prisma_client";
import type { Prisma } from "@prisma/client";

export type FindParams = {
  skip: number;
  take: number;
  search?: string;
  host_user_id?: string;
  space_id?: string;
  date_from?: Date;
  date_to?: Date;
};

const insensitive = "insensitive" as const;

function buildSearchWhere(
  search?: string
): Prisma.visitorsWhereInput | undefined {
  if (!search) return undefined;
  return {
    OR: [
      { first_name: { contains: search, mode: insensitive } },
      { last_name: { contains: search, mode: insensitive } },
      { email: { contains: search, mode: insensitive } },
      { dni: { contains: search, mode: insensitive } },
      { ruc: { contains: search, mode: insensitive } },
      { host: { is: { first_name: { contains: search, mode: insensitive } } } },
      { host: { is: { last_name: { contains: search, mode: insensitive } } } },
      { host: { is: { email: { contains: search, mode: insensitive } } } },
      { company: { is: { name: { contains: search, mode: insensitive } } } },
      { space: { is: { name: { contains: search, mode: insensitive } } } },
    ],
  };
}

export class GetVisitorsRepository {
  findById(id: string) {
    return prisma.visitors.findUnique({
      where: { id },
      include: {
        host: {
          select: { id: true, first_name: true, last_name: true, email: true },
        },
        company: { select: { id: true, name: true } },
        space: { select: { id: true, name: true } },
      },
    });
  }

  findMany(p: FindParams) {
    const { skip, take, search, host_user_id, space_id, date_from, date_to } =
      p;

    const where: Prisma.visitorsWhereInput = {
      ...(host_user_id ? { host_user_id } : {}),
      ...(space_id ? { space_id } : {}),
      ...(buildSearchWhere(search) ?? {}),
      ...(date_from || date_to
        ? {
            entry_time: {
              ...(date_from ? { gte: date_from } : {}),
              ...(date_to ? { lte: date_to } : {}),
            },
          }
        : {}),
    };

    return prisma.visitors.findMany({
      skip,
      take,
      where,
      orderBy: { entry_time: "desc" },
      include: {
        host: {
          select: { id: true, first_name: true, last_name: true, email: true },
        },
        company: { select: { id: true, name: true } },
        space: { select: { id: true, name: true } },
      },
    });
  }

  count(p: Omit<FindParams, "skip" | "take">) {
    const { search, host_user_id, space_id, date_from, date_to } = p;

    const where: Prisma.visitorsWhereInput = {
      ...(host_user_id ? { host_user_id } : {}),
      ...(space_id ? { space_id } : {}),
      ...(buildSearchWhere(search) ?? {}),
      ...(date_from || date_to
        ? {
            entry_time: {
              ...(date_from ? { gte: date_from } : {}),
              ...(date_to ? { lte: date_to } : {}),
            },
          }
        : {}),
    };

    return prisma.visitors.count({ where });
  }
}
