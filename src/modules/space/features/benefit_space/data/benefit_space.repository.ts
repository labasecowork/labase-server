// src/modules/space/features/benefit/data/benefit_space.repository.ts
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export class BenefitRepository {
  create(data: Prisma.BenefitCreateInput) {
    return prisma.benefit.create({ data });
  }

  list() {
    return prisma.benefit.findMany({ orderBy: { name: "asc" } });
  }

  update(id: string, data: Prisma.BenefitUpdateInput) {
    return prisma.benefit.update({ where: { id }, data });
  }

  findById(id: string) {
    return prisma.benefit.findUnique({ where: { id } });
  }
  
    delete(id: string) {
    return prisma.benefit.delete({ where: { id } });
  }
}
