//src/utils/email_sender
import { Attachment } from "nodemailer/lib/mailer";
import transporter from "../../config/email";
import { EMAIL_USER } from "../../config/env";
import { resolveImagePath } from "../path";

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string,
  attachments?: Attachment[]
): Promise<void> {
  try {
    const logoPath = resolveImagePath("logo.png");

    const info = await transporter.sendMail({
      from: EMAIL_USER,
      to,
      subject,
      text,
      html,
      attachments: [
        {
          filename: "logo.png",
          path: logoPath,
          cid: "logo",
        },
        ...(attachments || []),
      ],
    });

    //console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    //console.error("Failed to send email:", error);
    throw new Error("Error al enviar el correo electrónico");
  }
}
