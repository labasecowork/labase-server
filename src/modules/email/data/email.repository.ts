//src/modules/email/data/email.repository.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class EmailRepository {
  async getNewsletterEmails(): Promise<string[]> {
    const subs = await prisma.newsletterSubscriber.findMany({
      select: { email: true },
    });
    return subs.map((s) => s.email);
  }
}
