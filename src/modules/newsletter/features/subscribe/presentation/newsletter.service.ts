import { SubscribeNewsletterDTO } from "../domain/newsletter.dto";
import { sendEmail } from "../../../../../utils/email_sender";
import { SubscribeNewsletterRepository } from "../data/newsletter.repository";
import { AppError } from "../../../../../utils";
import { MESSAGES, HttpStatusCodes } from "../../../../../constants";

export class SubscribeNewsletterService {
  constructor(private readonly repository: SubscribeNewsletterRepository) {}

  async execute(data: SubscribeNewsletterDTO): Promise<string> {
    const existing = await this.repository.findSubscriberByEmail(data.email);

    if (existing) {
      throw new AppError(
        MESSAGES.NEWSLETTER.SUBSCRIBE_ERROR_ALREADY_SUBSCRIBED,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    await this.repository.subscribeUser(data.name, data.email);

    const subject = "¡Gracias por suscribirte al boletín de Arxatec!";
    const text = `Hola ${data.name}, gracias por suscribirte a nuestras novedades.`;

    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Gracias por suscribirte a LaBase</title>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'DM Sans', Arial, sans-serif; background-color: #f9fafb; padding: 2rem;">
      <div style="max-width: 600px; margin: auto; background-color: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <div style="text-align: center;">
          <img src="https://labase.dev/assets/logo-labase.png" alt="LaBase Logo" width="140" style="margin-bottom: 1rem;" />
          <h1 style="color: #111827; font-size: 1.4rem; margin-bottom: 0.5rem;">¡Gracias por suscribirte a LaBase!</h1>
        </div>

        <p style="color: #374151; font-size: 0.95rem;">
          Hola ${data.name},<br/><br/>
          Te damos la bienvenida a nuestra comunidad. Desde ahora recibirás novedades sobre:
        </p>

        <ul style="background-color: #f3f4f6; border-radius: 6px; padding: 1rem; font-size: 0.9rem; color: #4b5563;">
          <li>🎯 Nuevas funciones en nuestra plataforma</li>
          <li>🧠 Contenido educativo sobre espacios colaborativos</li>
          <li>🚀 Lanzamientos anticipados y mejoras importantes</li>
          <li>📢 Invitaciones a eventos y convocatorias exclusivas</li>
        </ul>

        <p style="color: #374151; font-size: 0.95rem;">
          Nuestro propósito es ayudarte a gestionar espacios compartidos de forma eficiente, moderna y colaborativa.
        </p>

        <div style="text-align: center; margin-top: 2rem;">
          <a href="https://labase.dev" target="_blank" style="background-color: #2563eb; color: white; padding: 0.75rem 1.5rem; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 0.95rem;">
            Conocer más sobre LaBase
          </a>
        </div>

        <p style="color: #6b7280; font-size: 0.8rem; margin-top: 2rem; text-align: center;">
          Si tú no solicitaste esta suscripción, puedes ignorar este mensaje o contactarnos para eliminar tu correo de la lista.
        </p>

        <p style="color: #9ca3af; font-size: 0.75rem; text-align: center; margin-top: 1rem;">
          Este correo fue enviado automáticamente por el sistema de LaBase.
        </p>
      </div>
    </body>
    </html>
    `;

    await sendEmail(data.email, subject, text, html);

    return MESSAGES.NEWSLETTER.SUBSCRIBE_SUCCESS;
  }
}
