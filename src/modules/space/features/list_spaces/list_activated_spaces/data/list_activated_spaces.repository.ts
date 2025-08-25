// src/modules/space/features/list_spaces/list_activated_spaces/data/list_activated_spaces.repository.ts
import { Prisma } from "@prisma/client";
import prisma from "../../../../../../config/prisma_client";

export class ListActivatedSpacesRepository {
  listMany(filters: Prisma.spaceFindManyArgs) {
    return prisma.space.findMany({
      ...filters,
      include: {
        prices: true,
        space_images: {
          select: {
            id: true,
            url: true,
            alt: true,
          },
        },
        space_benefits: { include: { benefit: true } },
      },
    });
  }
}
