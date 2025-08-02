// src/modules/payment/features/visa-callback/presentation/visa-callback.service.ts
import { VisaCallbackDTO } from "../domain/visa-callback.dto";
import { VisaCallbackRepository } from "../data/visa-callback.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { PaymentStatus } from "@prisma/client";
import type {
  CreatePaymentDTO,
  Currency,
  TransactionResponse,
} from "../../../../../shared/payments/providers/payment-provider.repository";

const DEFAULT_DATA_MAP = {
  urlAddress: process.env.FRONTEND_URL!,
  serviceLocationCityName: "Lima",
  serviceLocationCountrySubdivisionCode: "LIM",
  serviceLocationCountryCode: "PER",
  serviceLocationPostalCode: "15074",
};

export class VisaCallbackService {
  private repo = new VisaCallbackRepository();

  async execute(dto: VisaCallbackDTO) {
    // --- 1) Validaciones de entrada ---
    if (!dto.transactionToken) {
      throw new AppError(
        "MISSING_TRANSACTION_TOKEN",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    // --- 2) Recuperar la tx PENDING ---
    const tx = await this.repo.findTransaction(dto.purchaseNumber);
    if (!tx) {
      throw new AppError(
        "TRANSACTION_NOT_FOUND",
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    const { amount, currency: txCurrency, reservationId, userId } = tx;
    if (!reservationId || !userId) {
      throw new AppError(
        "INTERNAL_PAYMENT_ERROR",
        HttpStatusCodes.INTERNAL_SERVER_ERROR.code
      );
    }
    const currency = txCurrency as Currency;

    // --- 3) Armar DTO para Niubiz ---
    const providerDto: CreatePaymentDTO = {
      transactionToken: dto.transactionToken,
      purchaseNumber: dto.purchaseNumber,
      amount,
      currency,
      dataMap: DEFAULT_DATA_MAP,
    };
    let result: TransactionResponse;
    // --- 4) Llamar al provider ---
    try {
      result = await this.repo.callProvider(providerDto);
    } catch (error) {
      console.log("error", error);
      throw new AppError(
        "INTERNAL_PAYMENT_ERROR",
        HttpStatusCodes.INTERNAL_SERVER_ERROR.code
      );
    }

    // --- 5) Mapear estado y persistir ---
    const mappedStatus = result.success
      ? PaymentStatus.APPROVED
      : PaymentStatus.FAILED;

    await this.repo.upsertTransaction({
      purchaseNumber: dto.purchaseNumber,
      provider: "niubiz",
      amount: 10,
      currency: "USD",
      status: mappedStatus,
      rawResponse: result,
      reservationId,
      userId,
    });

    // --- 6) Confirmar reserva si procede ---
    if (result.success) {
      await this.repo.confirmReservation(reservationId);
    }

    return result;
  }
}
