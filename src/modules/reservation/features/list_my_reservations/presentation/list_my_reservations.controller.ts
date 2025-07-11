// src/modules/reservation/features/list_my_reservations/presentation/list_my_reservations.controller.ts
import { Response } from "express";
import { ListMyReservationsService } from "./list_my_reservations.service"; // ruta corregida (../services)
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class ListMyReservationsController {
  constructor(private readonly service = new ListMyReservationsService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    try {
      const { limit = 10, page = 1 } = req.query as any;

      const user = await getAuthenticatedUser(req);
      if (!user) {
        return res.status(HttpStatusCodes.UNAUTHORIZED.code).json(
          buildHttpResponse(
            HttpStatusCodes.UNAUTHORIZED.code,
            "Usuario no autenticado",
            req.path
          )
        );
      }

      const result = await this.service.execute(
        user.id,
        Number(limit),
        Number(page)
      );

      return res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "My reservations",
          req.path,
          result
        )
      );
    } catch (error) {
      return handleServerError(res, req, error);
    }
  }
}
