// src/modules/email/presentation/email.service.ts
import { EmailRepository } from "../data/email.repository";
import { BulkEmailDTO } from "../domain/dtos/bulk_email.dto";
import { sendEmail } from "../../../utils/email_sender";

export class EmailService {
  private emailRepository: EmailRepository;

  constructor() {
    this.emailRepository = new EmailRepository();
  }

  async sendBulkEmail(data: BulkEmailDTO) {
    const emails = await this.emailRepository.getNewsletterEmails();

    for (const email of emails) {
      try {
        await sendEmail(email, data.subject, data.text, data.html);
        console.log(`Email sent to: ${email}`);
      } catch (error) {
        console.error(`Error sending to ${email}:`, error);
      }
    }

    return { message: `Bulk email sent to ${emails.length} subscribers.` };
  }
}