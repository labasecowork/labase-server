// src/modules/space/features/detail_space/data/detail_space.repository.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class DetailSpaceRepository {
  findById(id: string) {
    return prisma.space.findUnique({
      where: { id },
      include: {
        prices: true,
        spaceBenefits: {
          include: { benefit: true },
        },
      },
    });
  }
}
