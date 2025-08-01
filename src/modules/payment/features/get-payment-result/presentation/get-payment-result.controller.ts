// src/modules/payment/features/get-payment-result/presentation/get-payment-result.controller.ts

import { Request, Response } from "express";
import { GetPaymentResultService } from "./get-payment-result.service";
import { handleServerError } from "../../../../../utils/error_handler";

export class GetPaymentResultController {
  constructor(private svc = new GetPaymentResultService()) {}

  async handle(req: Request, res: Response) {
    try {
      const { purchaseNumber } = req.params;
      const result = await this.svc.execute(purchaseNumber);
      return res.json(result);
    } catch (err) {
      return handleServerError(res, req, err);
    }
  }
}
