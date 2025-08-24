//src/modules/newsletter/features/subcribe/presentation/newsletter.service.ts
import { SubscribeNewsletterDTO } from "../domain/newsletter.dto";
import { sendEmail } from "../../../../../utils/email_sender";
import { SubscribeNewsletterRepository } from "../data/newsletter.repository";
import { AppError } from "../../../../../utils";
import { MESSAGES, HttpStatusCodes } from "../../../../../constants";
import path from "path";
import ejs from "ejs";

export class SubscribeNewsletterService {
  constructor(private readonly repository: SubscribeNewsletterRepository) {}

  async execute(data: SubscribeNewsletterDTO): Promise<string> {
    const existing = await this.repository.findSubscriberByEmail(data.email);

    if (existing) {
      throw new AppError(
        MESSAGES.NEWSLETTER.SUBSCRIBE_ERROR_ALREADY_SUBSCRIBED,
        HttpStatusCodes.BAD_REQUEST.code,
      );
    }

    await this.repository.subscribeUser(data.name, data.email);

    const subject = "¡Gracias por suscribirte a Labase!";
    const text = `Hola ${data.name}, gracias por suscribirte a nuestras novedades.`;

    const filePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "newsletter.ejs",
    );

    const html = await ejs.renderFile(filePath, { name: data.name });

    await sendEmail(data.email, subject, text, html);

    return MESSAGES.NEWSLETTER.SUBSCRIBE_SUCCESS;
  }
}
