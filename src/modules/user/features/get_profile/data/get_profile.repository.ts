import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class GetProfileRepository {
  async getProfile(id: string) {
    const user = await prisma.users.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        birth_date: true,
        gender: true,
        user_type: true,
        status: true,
        adminDetails: { select: { role: true } },
      },
    });
    return user;
  }
}
