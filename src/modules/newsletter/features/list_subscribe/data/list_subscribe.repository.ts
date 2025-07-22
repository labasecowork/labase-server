//src/modules/newsletter/features/list_subscribe/data/list_subscribe.repository.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ListSubscribeRepository {
  async getAllSubscribers() {
    return prisma.newsletterSubscriber.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async countSubscribers() {
    return prisma.newsletterSubscriber.count();
  }
}
