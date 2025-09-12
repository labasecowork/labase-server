import prisma from "../../../../../config/prisma_client";

export class CreateVisitorRepository {
  findUserById(user_id: string) {
    return prisma.users.findUnique({
      where: { id: user_id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        employee_details: {
          select: {
            company: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });
  }

  findSpaceById(space_id: string) {
    return prisma.space.findUnique({
      where: { id: space_id },
      select: {
        id: true,
        name: true,
        disabled: true,
      },
    });
  }

  create(data: {
    dni?: string | null;
    ruc?: string | null;
    first_name: string;
    last_name: string;
    phone?: string | null;
    email?: string | null;
    user_id: string;
    space_id: string;
    entry_time: Date;
    exit_time?: Date | null;
  }) {
    return prisma.visitors.create({
      data,
      include: {
        user: {
          select: { id: true, first_name: true, last_name: true, email: true },
        },
        space: {
          select: { id: true, name: true },
        },
      },
    });
  }
}
