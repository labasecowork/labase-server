// src/modules/payment/features/visa-callback/domain/visa-callback.dto.ts
export interface VisaCallbackDTO {
  purchaseNumber: string;
  transactionToken: string;
  reservationId: string;
}
