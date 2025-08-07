// src/modules/space/features/list_spaces/data/list_spaces.repository.ts
import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

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