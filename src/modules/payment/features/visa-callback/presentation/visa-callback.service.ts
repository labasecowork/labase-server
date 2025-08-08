// src/modules/payment/features/visa-callback/presentation/visa-callback.service.ts
import { VisaCallbackDTO } from "../domain/visa-callback.dto";
import { VisaCallbackRepository } from "../data/visa-callback.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { PaymentStatus } from "@prisma/client";
import type {
  CreatePaymentDTO,
  Currency,
} from "../../../../../shared/payments/providers/payment-provider.repository";

export class VisaCallbackService {
  private repo = new VisaCallbackRepository();

  async execute(dto: VisaCallbackDTO) {
    if (!dto.transactionToken) {
      throw new AppError(
        "MISSING_TRANSACTION_TOKEN",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

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

    const providerDto: CreatePaymentDTO = {
      transactionToken: dto.transactionToken,
      purchaseNumber: dto.purchaseNumber,
      amount,
      currency: txCurrency as Currency,
      dataMap: {
        urlAddress: process.env.FRONTEND_URL ?? "https://demo.labase.pe",
        serviceLocationCityName: "Lima",
        serviceLocationCountrySubdivisionCode: "LIM",
        serviceLocationCountryCode: "PER",
        serviceLocationPostalCode: "15074",
      },
    };

    const result = await this.repo.callProvider(providerDto);
    const mappedStatus = result.success
      ? PaymentStatus.APPROVED
      : PaymentStatus.FAILED;

    await this.repo.upsertTransaction({
      purchaseNumber: dto.purchaseNumber,
      provider: "niubiz",
      amount,
      currency: txCurrency,
      status: mappedStatus,
      rawResponse: result,
      reservationId,
      userId,
    });

    if (result.success) {
      await this.repo.confirmReservation(reservationId);
    }

    return {
      success: result.success,
      status: mappedStatus,
      providerResponse: result,
      reservationId,
      purchaseNumber: dto.purchaseNumber,
    };
  }
}
