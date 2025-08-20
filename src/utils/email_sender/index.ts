//src/utils/email_sender
import { Attachment } from "nodemailer/lib/mailer";
import transporter from "../../config/email";
import { EMAIL_USER, ENVIRONMENT, PROJECT_ROOT } from "../../config/env";
import path from "path";
import { getDirname } from "..";

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string,
  attachments?: Attachment[]
): Promise<void> {
  try {
    const dirname = ENVIRONMENT === "production" ? PROJECT_ROOT || "" : getDirname(import.meta.url);

    const info = await transporter.sendMail({
      from: EMAIL_USER,
      to,
      subject,
      text,
      html,
      attachments: [
        {
          filename: "logo.png",
          path: path.join(
            dirname,
            "public/images/logo.png"
          ),
          cid: "logo",
        },
        ...(attachments || []),
      ],
    });

    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Email sending failed");
  }
}
