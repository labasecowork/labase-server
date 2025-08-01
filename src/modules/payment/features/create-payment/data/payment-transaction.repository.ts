// src/modules/payment/features/create-payment/data/payment-transaction.repository.ts

import { PrismaClient, PaymentTransaction, PaymentStatus } from "@prisma/client";

const prisma = new PrismaClient();

export class PaymentTransactionRepository {
  async upsert(tx: {
    purchaseNumber: string;
    provider: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    rawResponse?: any;
    reservationId: string;
    userId?: string;
  }): Promise<PaymentTransaction> {
    return prisma.paymentTransaction.upsert({
      where: { purchaseNumber: tx.purchaseNumber },
      create: {
        purchaseNumber: tx.purchaseNumber,
        provider:       tx.provider,
        amount:         tx.amount,
        currency:       tx.currency,
        status:         tx.status,
        rawResponse:    tx.rawResponse ?? {},
        reservationId:  tx.reservationId,
        userId:         tx.userId,
      },
      update: {
        status:      tx.status,
        rawResponse: tx.rawResponse ?? {},
        userId:      tx.userId,
      },
    });
  }

  async findByPurchaseNumber(
    purchaseNumber: string
  ): Promise<PaymentTransaction | null> {
    return prisma.paymentTransaction.findUnique({
      where: { purchaseNumber },
    });
  }
}
