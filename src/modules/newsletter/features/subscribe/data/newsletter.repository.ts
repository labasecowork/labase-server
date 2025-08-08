//src/modules/newsletter/data/newsletter.repository.ts
import prisma from "../../../../../config/prisma_client";

import prisma from "../../../../../config/prisma_client";

export class SubscribeNewsletterRepository {
  async findSubscriberByEmail(email: string) {
    return prisma.newsletterSubscriber.findUnique({
      where: { email },
    });
  }

  async subscribeUser(name: string, email: string) {
    return prisma.newsletterSubscriber.create({
      data: { name, email },
    });
  }
}
