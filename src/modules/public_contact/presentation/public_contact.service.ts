import { sendEmail } from "../../../utils/email_sender";
import { PublicContactDTO } from "../domain/public_contact.dto";
import { EMAIL_USER } from "../../../config/env";

export const publicContactService = async (
  dto: PublicContactDTO
): Promise<void> => {
  if (!EMAIL_USER) {
    throw new Error("EMAIL_USER is not defined in environment variables");
  }

  const fullName = `${dto.firstName} ${dto.lastName}`;

  const plainText = `
Nombre: ${fullName}
Correo: ${dto.email}
Celular: ${dto.phoneNumber || "-"}
Motivo: ${dto.reason}
Mensaje:
${dto.message}
  `.trim();

  const htmlContent = `
    <p><strong>Nombre:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${dto.email}</p>
    ${
      dto.phoneNumber
        ? `<p><strong>Celular:</strong> ${dto.phoneNumber}</p>`
        : ""
    }
    <p><strong>Motivo:</strong> ${dto.reason}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${dto.message}</p>
  `;

  await sendEmail(
    EMAIL_USER,
    `📩 Contacto Web: ${dto.reason}`,
    plainText,
    htmlContent
  );
};
