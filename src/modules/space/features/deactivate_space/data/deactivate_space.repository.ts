// src/modules/space/features/deactivate_space/data/deactivate_space.repository.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class DeactivateSpaceRepository {
  update(id: string) {
    return prisma.space.update({
      where: { id },
      data:  { disabled: true },
    });
  }
}
