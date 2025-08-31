// src/modules/visitor/features/edit_visitor/data/edit_visitor.repository.ts
import prisma from "../../../../../config/prisma_client";

export class EditVisitorRepository {
  findById(id: string) {
    return prisma.visitors.findUnique({
      where: { id },
      include: {
        client: { include: { user: true, company: true } },
        space: true,
      },
    });
  }

  findSpaceById(space_id: string) {
    return prisma.space.findUnique({ where: { id: space_id } });
  }

  update(
    id: string,
    data: Partial<{
      phone: string | null;
      email: string | null;
      exit_time: Date | null;
      space_id: string;
    }>,
  ) {
    const { phone, email, exit_time, space_id } = data;

    return prisma.visitors.update({
      where: { id },
      data: {
        phone: phone ?? undefined,
        email: email ?? undefined,
        exit_time: exit_time ?? undefined,
        ...(space_id
          ? {
              space: {
                connect: { id: space_id },
              },
            }
          : {}),
      },
    });
  }
}
