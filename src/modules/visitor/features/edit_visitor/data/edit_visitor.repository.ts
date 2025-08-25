// src/modules/visitor/features/edit_visitor/data/edit_visitor.repository.ts
import prisma from "../../../../../config/prisma_client";

export class EditVisitorRepository {
  findById(id: string) {
    return prisma.visitors.findUnique({ where: { id } });
  }
  update(
    id: string,
    data: Partial<{
      phone: string | null;
      email: string | null;
      company: string | null;
      exit_time: Date | null;
      space_id: string;
    }>,
  ) {
    return prisma.visitors.update({ where: { id }, data });
  }
  findSpaceById(space_id: string) {
    return prisma.space.findUnique({ where: { id: space_id } });
  }
}
