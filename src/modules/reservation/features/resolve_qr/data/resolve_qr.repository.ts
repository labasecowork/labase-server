// src/modules/reservation/features/resolve_qr/data/resolve_qr.repository.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ResolveQrRepository {
  findReservationByCode(code: string) {
    return prisma.reservation.findUnique({
      where: { codeQr: code },
      include: { space: true, user: true },
    });
  }
}
