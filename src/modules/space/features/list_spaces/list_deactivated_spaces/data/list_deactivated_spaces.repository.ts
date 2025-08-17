// src/modules/space/features/list_spaces/list_deactivated_spaces/data/list_deactivated_spaces.repository.ts
import prisma from "../../../../../../config/prisma_client";

export class ListDeactivatedSpacesRepository {
  listMany() {
    return prisma.space.findMany({
      where: { disabled: true },
      include: {
        prices: true,
        spaceBenefits: { include: { benefit: true } },
      },
      orderBy: { id: "asc" },
    });
  }
}
