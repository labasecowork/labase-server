// src/modules/payment/features/get-payment-result/presentation/get-payment-result.controller.ts
import { Request, Response } from "express";
import { GetPaymentResultService } from "./get-payment-result.service";
import { handleServerError } from "../../../../../utils/error_handler";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class GetPaymentResultController {
  constructor(private svc = new GetPaymentResultService()) {}

  async findOne(req: Request, res: Response) {
    try {
      const { purchaseNumber } = req.params;
      const result = await this.svc.findOne(purchaseNumber);
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Payment result retrieved successfully",
            "/payment/result",
            result
          )
        );
    } catch (err) {
      return handleServerError(res, req, err);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const user = await getAuthenticatedUser(req);
      const results = await this.svc.findAll(user.id);
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Payment results retrieved successfully",
            "/payment/result",
            results
          )
        );
    } catch (err) {
      return handleServerError(res, req, err);
    }
  }
}
