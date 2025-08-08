// src/modules/space/features/create_space/data/create_space.repository.ts
import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class CreateSpaceRepository {
  create(data: Prisma.SpaceCreateInput) {
    return prisma.space.create({ data });
  }
}
