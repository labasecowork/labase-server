// src/modules/payment/features/create-payment/presentation/create-payment.controller.ts

import { Request, Response } from "express";
import { CreatePaymentService } from "./create-payment.service";
import { CreatePaymentSchema }  from "../domain/create-payment.schema";
import { buildHttpResponse }    from "../../../../../utils/build_http_response";
import { handleServerError }    from "../../../../../utils/error_handler";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";

export class CreatePaymentController {
  private svc = new CreatePaymentService();

  async handle(req: Request, res: Response) {
    try {
      // 1) Validamos y parseamos
      const dto = CreatePaymentSchema.parse(req.body);

      // 2) Extraemos userId del token
      const user = await getAuthenticatedUser(req);

      // 3) Ejecutamos el servicio
      const result = await this.svc.execute(dto, user.id);

      // 4) Respuesta
        const payload = buildHttpResponse(
          200,
          "Payment flow initiated",
          req.path,
          result
        );
        return res.status(200).json(payload);
       
    } catch (err) {
      return handleServerError(res, req, err);
    }
  }
}
