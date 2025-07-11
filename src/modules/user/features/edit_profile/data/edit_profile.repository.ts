// src/modules/user/features/edit_profile/data/edit_profile.repository.ts
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

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
}
