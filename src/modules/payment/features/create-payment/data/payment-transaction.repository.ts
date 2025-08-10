// src/modules/payment/features/create-payment/data/payment-transaction.repository.ts

import { PaymentTransaction, PaymentStatus } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";

export interface CreateTransactionData {
  purchaseNumber: string;
  transactionId: string;
  amount: number;
  authorizationCode: string;
  status: PaymentStatus;
  actionDescription: string;
  cardMasked: string;
  transactionDate: string;
  errorCode: number;
  errorMessage: string;
  reservationId: string;
  userId?: string;
}

export class PaymentTransactionRepository {
  async upsert(
    transactionData: CreateTransactionData
  ): Promise<PaymentTransaction> {
    // Intenta actualizar primero, luego crear si no existe
    try {
      return await prisma.paymentTransaction.upsert({
        where: { purchaseNumber: transactionData.purchaseNumber },
        update: this.buildUpdateData(transactionData),
        create: this.buildCreateData(transactionData),
      });
    } catch (error) {
      // Fallback: crear directamente si hay problemas con upsert
      return await prisma.paymentTransaction.create({
        data: this.buildCreateData(transactionData),
      });
    }
  }

  async findByPurchaseNumber(
    purchaseNumber: string
  ): Promise<PaymentTransaction | null> {
    return prisma.paymentTransaction.findUnique({
      where: { purchaseNumber },
    });
  }

  async findByTransactionId(
    transactionId: string
  ): Promise<PaymentTransaction | null> {
    return prisma.paymentTransaction.findFirst({
      where: { transactionId },
    });
  }

  async findByReservationId(
    reservationId: string
  ): Promise<PaymentTransaction[]> {
    return prisma.paymentTransaction.findMany({
      where: { reservationId },
      orderBy: { createdAt: "desc" },
    });
  }

  private buildCreateData(tx: CreateTransactionData) {
    return {
      purchaseNumber: tx.purchaseNumber,
      transactionId: tx.transactionId,
      amount: tx.amount,
      authorizationCode: tx.authorizationCode,
      status: tx.status,
      actionDescription: tx.actionDescription,
      cardMasked: tx.cardMasked,
      transactionDate: tx.transactionDate,
      errorCode: tx.errorCode,
      errorMessage: tx.errorMessage,
      reservationId: tx.reservationId,
      userId: tx.userId,
    };
  }

  private buildUpdateData(tx: CreateTransactionData) {
    return {
      transactionId: tx.transactionId,
      amount: tx.amount,
      authorizationCode: tx.authorizationCode,
      status: tx.status,
      actionDescription: tx.actionDescription,
      cardMasked: tx.cardMasked,
      transactionDate: tx.transactionDate,
      errorCode: tx.errorCode,
      errorMessage: tx.errorMessage,
      // No actualizamos userId ni reservationId en updates
    };
  }
}
