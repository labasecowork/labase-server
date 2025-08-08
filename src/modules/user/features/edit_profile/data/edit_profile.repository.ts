// src/modules/user/features/edit_profile/data/edit_profile.repository.ts
import { Prisma } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class EditProfileRepository {
  async update(userId: string, data: Prisma.UsersUpdateInput) {
    return prisma.users.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        user_type: true,
        adminDetails: { select: { role: true } },
      },
    });
  }

  async getStatus(userId: string) {
    return prisma.users.findUniqueOrThrow({
      where: { id: userId },
      select: { status: true },
    });
  }
}
