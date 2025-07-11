// src/modules/space/features/list_spaces/data/list_spaces.repository.ts
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export class ListSpacesRepository {
  listMany(filters: Prisma.SpaceFindManyArgs) {
    return prisma.space.findMany({
      ...filters,
      include: {
        prices: true,
        spaceBenefits: { include: { benefit: true } },
      },
    });
  }
}