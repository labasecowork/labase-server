// src/modules/reservation/features/create_reservation/presentation/create_reservation.controller.ts
import { Response } from "express";
import { CreateReservationService } from "./create_reservation.service";
import { CreateReservationSchema } from "../domain/create_reservation.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class CreateReservationController {
  constructor(private readonly service = new CreateReservationService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = CreateReservationSchema.parse(req.body);
    const user = await getAuthenticatedUser(req);

    const result = await this.service.execute(dto, user);

    return res.status(HttpStatusCodes.CREATED.code).json(
      buildHttpResponse(HttpStatusCodes.CREATED.code, result.message, req.path, {
        reservation_id: result.reservation_id,
        codeQr: result.codeQr,
        price: result.price,
        status: result.status,
        user,
      })
    );
  }
}
