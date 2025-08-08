// src/modules/payment/features/create-payment/data/create-payment.repository.ts

import { Reservation } from "@prisma/client";
import { CreatePaymentDTO } from "../domain/create-payment.dto";
import { resolvePaymentProvider } from "../../../../../shared/payments/utils/payments.helpers";
import prisma from "../../../../../config/prisma_client";

export interface StartPaymentResult {
  purchaseNumber: string;
  sessionToken: string;
  scriptUrl: string;
}

type EnrichedPaymentDTO = CreatePaymentDTO & {
  purchaseNumber: string;
  amount: number;
  currency: "PEN" | "USD";
};

export class CreatePaymentRepository {
  private provider = resolvePaymentProvider();

  async execute(dto: EnrichedPaymentDTO): Promise<StartPaymentResult> {
    const accessToken = await this.provider.getAccessToken();

    const sessionRequest = {
      channel: "web",
      purchaseNumber: dto.purchaseNumber,
      amount: dto.amount,
      currency: dto.currency,
      metadata: dto.metadata,
    };

    const sessionToken = await this.provider.getSessionToken(accessToken, sessionRequest);
    const scriptUrl = await this.provider.getCheckoutScript();

    return {
      purchaseNumber: dto.purchaseNumber,
      sessionToken,
      scriptUrl,
    };
  }
}

/**
 * Repositorio para validar y actualizar reservas desde el módulo de pago
 */
export class ReservationRepository {

  async findById(id: string): Promise<Reservation | null> {
    return prisma.reservation.findUnique({
      where: { id },
    });
  }
  async updateStatus(
    id: string,
    status: Reservation["status"]
  ): Promise<Reservation> {
    return prisma.reservation.update({
      where: { id },
      data: { status },
    });
  }
}
