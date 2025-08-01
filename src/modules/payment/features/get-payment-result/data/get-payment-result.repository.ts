// src/modules/payment/features/get-payment-result/data/get-payment-result.repository.ts

import { PaymentTransactionRepository } from "../../create-payment/data/payment-transaction.repository";
import { PaymentTransaction } from "@prisma/client";

export class GetPaymentResultRepository {
  private txRepo = new PaymentTransactionRepository();

  async execute(purchaseNumber: string): Promise<PaymentTransaction | null> {
    return this.txRepo.findByPurchaseNumber(purchaseNumber);
  }
}
