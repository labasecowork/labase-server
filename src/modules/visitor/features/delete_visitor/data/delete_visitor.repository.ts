// src/modules/visitor/features/delete_visitor/data/delete_visitor.repository.ts
import prisma from "../../../../../config/prisma_client";

export class DeleteVisitorRepository {
  findById(id: string) {
    return prisma.visitors.findUnique({ where: { id } });
  }
  delete(id: string) {
    return prisma.visitors.delete({ where: { id } });
  }
}
