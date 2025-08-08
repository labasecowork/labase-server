//src/modules/newsletter/features/list_subscribe/data/list_subscribe.repository.ts
import prisma from "../../../../../config/prisma_client";

import prisma from "../../../../../config/prisma_client";

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
