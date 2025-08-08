//src/modules/bulk_email/data/bulk_email.repository.ts
import prisma from "../../../config/prisma_client";

export class EmailRepository {
  async getNewsletterEmails(): Promise<string[]> {
    const subs = await prisma.newsletterSubscriber.findMany({
      select: { email: true },
    });
    return subs.map((s) => s.email);
  }
}
