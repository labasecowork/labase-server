// src/modules/user/features/list_users/data/list_users.repository.ts
import prisma from "../../../../../config/prisma_client";

export class ListUsersRepository {
  listMany() {
    return prisma.users.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
      },
    });
  }
}
