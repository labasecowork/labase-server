// src/modules/visitor/features/get_visitors/data/get_visitors.repository.ts
import prisma from "../../../../../config/prisma_client";

export type FindParams = {
  skip: number;
  take: number;
  search?: string; // first_name/last_name/company
  employee_id?: string;
  space_id?: string;
  date_from?: Date;
  date_to?: Date;
};

export class GetVisitorsRepository {
  findById(id: string) {
    return prisma.visitors.findUnique({
      where: { id },
      include: {
        employee: {
          select: {
            employee_id: true,
            company: { select: { id: true, name: true } },
            work_area: { select: { id: true, name: true } },
            user: { select: { id: true, first_name: true, last_name: true } },
          },
        },
        space: { select: { id: true, name: true } },
      },
    });
  }

  findMany(p: FindParams) {
    const { skip, take, search, employee_id, space_id, date_from, date_to } = p;
    return prisma.visitors.findMany({
      skip,
      take,
      where: {
        ...(employee_id ? { employee_id } : {}),
        ...(space_id ? { space_id } : {}),
        ...(search
          ? {
              OR: [
                { first_name: { contains: search, mode: "insensitive" } },
                { last_name: { contains: search, mode: "insensitive" } },
                { company: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
        ...(date_from || date_to
          ? {
              entry_time: {
                ...(date_from ? { gte: date_from } : {}),
                ...(date_to ? { lte: date_to } : {}),
              },
            }
          : {}),
      },
      orderBy: { created_at: "desc" },
      include: {
        space: { select: { id: true, name: true } },
      },
    });
  }

  count(p: Omit<FindParams, "skip" | "take">) {
    const { search, employee_id, space_id, date_from, date_to } = p;
    return prisma.visitors.count({
      where: {
        ...(employee_id ? { employee_id } : {}),
        ...(space_id ? { space_id } : {}),
        ...(search
          ? {
              OR: [
                { first_name: { contains: search, mode: "insensitive" } },
                { last_name: { contains: search, mode: "insensitive" } },
                { company: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
        ...(date_from || date_to
          ? {
              entry_time: {
                ...(date_from ? { gte: date_from } : {}),
                ...(date_to ? { lte: date_to } : {}),
              },
            }
          : {}),
      },
    });
  }
}
