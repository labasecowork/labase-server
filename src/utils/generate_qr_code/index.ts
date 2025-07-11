// src/shared/utils/generate_qr_code.ts
import { customAlphabet } from "nanoid";
import { QR_CODE_ALPHABET, QR_CODE_LENGTH } from "../../config/env";

const generator = customAlphabet(QR_CODE_ALPHABET, QR_CODE_LENGTH);

export function generateQrCode(): string {
  return generator();
}
