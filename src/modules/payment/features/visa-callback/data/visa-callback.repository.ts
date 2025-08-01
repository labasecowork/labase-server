// src/modules/payment/features/visa-callback/data/visa-callback.repository.ts
import { PaymentStatus } from "@prisma/client";
import type {
  CreatePaymentDTO,
  TransactionResponse,
} from "../../../../../shared/payments/providers/payment-provider.repository";
import { resolvePaymentProvider } from "../../../../../shared/payments/utils/payments.helpers";
import { PaymentTransactionRepository } from "../../create-payment/data/payment-transaction.repository";
import { CreateReservationRepository as ReservationRepository } from "../../../../reservation/features/create_reservation/data/create_reservation.repository";

export class VisaCallbackRepository {
  private provider   = resolvePaymentProvider();
  private txRepo     = new PaymentTransactionRepository();
  private reservRepo = new ReservationRepository();

  /** Recupera la transacción PENDING */
  findTransaction(purchaseNumber: string) {
    return this.txRepo.findByPurchaseNumber(purchaseNumber);
  }

  /** Llama al provider (Niubiz) */
  callProvider(dto: CreatePaymentDTO): Promise<TransactionResponse> {
    return this.provider.validateTransaction(dto);
  }

  /** Graba/actualiza la transacción en la DB */
  upsertTransaction(record: {
    purchaseNumber: string;
    provider: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    rawResponse?: any;
    reservationId: string;
    userId: string;
  }) {
    return this.txRepo.upsert(record);
  }

  /** Confirma la reserva en la DB */
  confirmReservation(reservationId: string) {
    return this.reservRepo.updateStatus(reservationId, "CONFIRMED");
  }
}
