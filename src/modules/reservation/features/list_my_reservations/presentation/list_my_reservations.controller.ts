// src/modules/reservation/features/list_my_reservations/presentation/list_my_reservations.controller.ts
import { Response } from "express";
import { ListMyReservationsService } from "./list_my_reservations.service";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class ListMyReservationsController {
  constructor(private readonly service = new ListMyReservationsService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const user = await getAuthenticatedUser(req); // puede lanzar AppError

    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    const result = await this.service.execute(user.id, limit, page);

    return res.status(HttpStatusCodes.OK.code).json(
      buildHttpResponse(
        HttpStatusCodes.OK.code,
        "My reservations",
        req.path,
        result
      )
    );
  }
}
