// src/modules/reservation/features/cancel_reservation/presentation/cancel_reservation.controller.ts
import { Response } from "express";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { CancelReservationService } from "./cancel_reservation.service";
import { CancelReservationParamsSchema } from "../domain/cancel_reservation.schema";

export class CancelReservationController {
  constructor(private readonly service = new CancelReservationService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const { id } = CancelReservationParamsSchema.parse(req.params);
    const user = await getAuthenticatedUser(req);

    const result = await this.service.execute(id, user);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          result.message,
          req.path,
          result,
        ),
      );
  }
}
