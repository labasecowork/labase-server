//src/modules/newsletter/data/newsletter.repository.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
