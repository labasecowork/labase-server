// src/modules/payment/features/get-payment-result/data/get-payment-result.repository.ts
import { PaymentTransaction } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export class GetPaymentResultRepository {
  async findByPurchaseNumber(
    purchaseNumber: string
  ): Promise<PaymentTransaction | null> {
    return prisma.paymentTransaction.findUnique({
      where: { purchaseNumber },
    });
  }

  async findAllByUser(userId: string): Promise<PaymentTransaction[]> {
    return prisma.paymentTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        reservation: true,
      },
    });
  }
}
