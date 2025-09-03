// src/modules/visitor/features/edit_visitor/data/edit_visitor.repository.ts
import prisma from "../../../../../config/prisma_client";

export class EditVisitorRepository {
  findById(id: string) {
    return prisma.visitors.findUnique({
      where: { id },
      include: {
        user: true,
        space: true,
      },
    });
  }

  findSpaceById(space_id: string) {
    return prisma.space.findUnique({ where: { id: space_id } });
  }

  findClientById(client_id: string) {
    return prisma.users.findUnique({ where: { id: client_id } });
  }

  update(
    id: string,
    data: Partial<{
      dni: string | null;
      ruc: string | null;
      first_name: string;
      last_name: string;
      phone: string | null;
      email: string | null;
      user_id: string;
      space_id: string;
      entry_time: Date;
      exit_time: Date | null;
    }>
  ) {
    const {
      dni,
      ruc,
      first_name,
      last_name,
      phone,
      email,
      user_id,
      space_id,
      entry_time,
      exit_time,
    } = data;

    return prisma.visitors.update({
      where: { id },
      data: {
        dni: dni ?? undefined,
        ruc: ruc ?? undefined,
        first_name: first_name ?? undefined,
        last_name: last_name ?? undefined,
        phone: phone ?? undefined,
        email: email ?? undefined,
        entry_time: entry_time ?? undefined,
        exit_time: exit_time ?? undefined,
        user_id: user_id ?? undefined,
        space_id: space_id ?? undefined,
      },
    });
  }
}
