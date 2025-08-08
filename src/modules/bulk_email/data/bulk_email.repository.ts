//src/modules/bulk_email/data/bulk_email.repository.ts
import prisma from "../../../config/prisma_client";

export class EmailRepository {
  async getNewsletterEmails(): Promise<{ name: string; email: string }[]> {
    const subs = await prisma.newsletterSubscriber.findMany({
      select: { email: true, name: true },
    });
    return subs;
  }
}
