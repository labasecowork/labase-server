// src/modules/visitor/features/create_visitor/data/create_visitor.repository.ts
import prisma from "../../../../../config/prisma_client";

export class CreateVisitorRepository {
  findHostByClientId(client_id: string) {
    return prisma.client_details.findUnique({
      where: { client_id },
      include: {
        user: true,
        company: true,
      },
    });
  }

  findSpaceById(space_id: string) {
    return prisma.space.findUnique({ where: { id: space_id } });
  }

  create(data: {
    dni?: string | null;
    ruc?: string | null;
    first_name: string;
    last_name: string;
    phone?: string | null;
    email?: string | null;
    client_id: string;
    space_id: string;
    entry_time: Date;
    exit_time?: Date | null;
}) {
    return prisma.visitors.create({ data });
  }
}
