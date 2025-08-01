// src/modules/payment/features/get-payment-result/presentation/get-payment-result.service.ts

import { GetPaymentResultRepository } from "../data/get-payment-result.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class GetPaymentResultService {
  constructor(private repo = new GetPaymentResultRepository()) {}

  async execute(purchaseNumber: string) {
    const tx = await this.repo.execute(purchaseNumber);
    if (!tx) {
      throw new AppError(
        "TRANSACTION_NOT_FOUND",
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    return tx;
  }
}
