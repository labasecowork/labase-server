// src/modules/space/features/create_space/data/create_space.repository.ts
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export class CreateSpaceRepository {
  create(data: Prisma.SpaceCreateInput) {
    return prisma.space.create({ data });
  }
}
