// src/modules/bulk_email/presentation/bulk_email.service.ts
import { EmailRepository } from "../data/bulk_email.repository";
import { BulkEmailDTO } from "../domain/dtos/bulk_email.dto";
import { sendEmail } from "../../../utils/email_sender";
import { AppError } from "../../../utils";
import { HttpStatusCodes } from "../../../constants";

export class EmailService {
  private emailRepository: EmailRepository;

  constructor() {
    this.emailRepository = new EmailRepository();
  }

  async sendBulkEmail(data: BulkEmailDTO) {
    const emails = await this.emailRepository.getNewsletterEmails();

    for (const email of emails) {
      try {
        await sendEmail(email, data.subject, "LaBase", data.html);
        console.log(`Email sent to: ${email}`);
      } catch (error) {
        throw new AppError(
          "Error sending email",
          HttpStatusCodes.INTERNAL_SERVER_ERROR.code
        );
      }
    }

    return { message: `Bulk email sent to ${emails.length} subscribers.` };
  }
}
