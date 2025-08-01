// src/modules/payment/features/visa-callback/presentation/visa-callback.controller.ts
import { Request, Response } from "express";
import { VisaCallbackService } from "./visa-callback.service";
import { VisaCallbackDTO } from "../domain/visa-callback.dto";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class VisaCallbackController {
  constructor(private svc = new VisaCallbackService()) {}

  async handle(req: Request, res: Response) {
    console.log("🍃 CALLBACK REQ.BODY:", req.body);
    console.log("🍃 CALLBACK REQ.HEADERS:", req.headers["content-type"]);
    const query  = req.query
    const purchaseNumber = query.purchaseNumber as string
    const { transactionToken } = req.body as VisaCallbackDTO;
    if (!purchaseNumber || !transactionToken) {
      console.log(purchaseNumber, transactionToken)
      throw new AppError("MISSING_PARAMETERS", HttpStatusCodes.BAD_REQUEST.code);
    }

    await this.svc.execute({ purchaseNumber , transactionToken });
    return res.redirect(
      `${process.env.APP_URL}/reservations/finalize?purchaseNumber=${purchaseNumber}`
    );
  }
}
