// src/modules/payment/features/get-payment-result/presentation/get-payment-result.controller.ts
import { Request, Response } from "express";
import { GetPaymentResultService } from "./get-payment-result.service";
import { handleServerError } from "../../../../../utils/error_handler";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";

export class GetPaymentResultController {
  constructor(private svc = new GetPaymentResultService()) {}

  async findOne(req: Request, res: Response) {
    try {
      const { purchaseNumber } = req.params;
      const result = await this.svc.findOne(purchaseNumber);
      return res.json(result);
    } catch (err) {
      return handleServerError(res, req, err);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const user = await getAuthenticatedUser(req);
      const results = await this.svc.findAll(user.id);
      return res.json(results);
    } catch (err) {
      return handleServerError(res, req, err);
    }
  }
}
