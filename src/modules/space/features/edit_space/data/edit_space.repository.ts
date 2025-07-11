// src/modules/space/features/edit_space/data/edit_space.repository.ts
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export class EditSpaceRepository {
  update(id: string, data: Prisma.SpaceUpdateInput) {
    return prisma.space.update({
      where: { id },
      data,
      include: {
        prices: true,
        spaceBenefits: {         
          include: { benefit: true },
        },
      },
    });
  }

  findById(id: string) {
    return prisma.space.findUnique({
      where: { id },
      include: {
        prices: true,
        spaceBenefits: { include: { benefit: true } },
      },
    });
  }
}
