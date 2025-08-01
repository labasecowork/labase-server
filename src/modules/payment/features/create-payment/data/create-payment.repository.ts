// src/modules/payment/features/create-payment/data/create-payment.repository.ts

import { PrismaClient, Reservation } from "@prisma/client";
import { CreatePaymentDTO } from "../domain/create-payment.dto";
import { resolvePaymentProvider } from "../../../../../shared/payments/utils/payments.helpers";

const prisma = new PrismaClient();

export interface StartPaymentResult {
  purchaseNumber: string;
  sessionToken: string;
  scriptUrl: string;
}

export class CreatePaymentRepository {
  private provider = resolvePaymentProvider();

  /**
   * Inicia el flujo de pago con Niubiz:
   * 1) Obtiene accessToken
   * 2) Solicita sessionToken
   * 3) Recupera URL del script de checkout
   */
  async execute(dto: CreatePaymentDTO): Promise<StartPaymentResult> {
    const accessToken = await this.provider.getAccessToken();

    const sessionRequest = {
      channel:        "web",
      purchaseNumber: dto.purchaseNumber,
      amount:         dto.amount,
      currency:       dto.currency,
      antifraud:      dto.metadata?.antifraud,
      dataMap:        dto.metadata?.dataMap,
    };

    const sessionToken = await this.provider.getSessionToken(
      accessToken,
      sessionRequest
    );
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
  /**
   * Obtiene la reserva por su ID
   */
  async findById(id: string): Promise<Reservation | null> {
    return prisma.reservation.findUnique({
      where: { id },
    });
  }

  /**
   * Actualiza únicamente el campo `status` de una reserva
   * @param id ID de la reserva
   * @param status Nuevo estado (tipo inferido de Reservation['status'])
   */
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
