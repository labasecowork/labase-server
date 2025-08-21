// src/modules/space/features/activate_space/data/activate_space.repository.ts
import prisma from "../../../../../config/prisma_client";

export class ActivateSpaceRepository {
  update(id: string) {
    return prisma.space.update({
      where: { id },
      data: { disabled: false },
    });
  }
}
