// src/modules/space/features/deactivate_space/data/deactivate_space.repository.ts
import prisma from "../../../../../config/prisma_client";
import prisma from "../../../../../config/prisma_client";

export class DeactivateSpaceRepository {
  update(id: string) {
    return prisma.space.update({
      where: { id },
      data:  { disabled: true },
    });
  }
}
