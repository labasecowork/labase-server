// src/modules/payment/features/visa-callback/presentation/visa-callback.controller.ts
import { Request, Response } from "express";
import { VisaCallbackService } from "./visa-callback.service";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { handleServerError } from "../../../../../utils/error_handler";

export class VisaCallbackController {
  constructor(private svc = new VisaCallbackService()) {}

  async handle(req: Request, res: Response) {
    try {
      const purchaseNumber = req.query.purchaseNumber as string;
      const transactionToken = req.body.transactionToken as string;

      if (!purchaseNumber || !transactionToken) {
        throw new AppError(
          "MISSING_PARAMETERS",
          HttpStatusCodes.BAD_REQUEST.code
        );
      }

      const result = await this.svc.execute({ purchaseNumber, transactionToken });

      return res.status(200).json({
        message: "Pago procesado correctamente",
        ...result,
      });
    } catch (error) {
      return handleServerError(res, req, error);
    }
  }
}
