// src/modules/space/features/detail_space/data/detail_space.repository.ts
import prisma from "../../../../../config/prisma_client";

export class DetailSpaceRepository {
  findById(id: string) {
    return prisma.space.findUnique({
      where: { id },
      include: {
        prices: true,
        space_benefits: {
          include: { benefit: true },
        },
      },
    });
  }
}
