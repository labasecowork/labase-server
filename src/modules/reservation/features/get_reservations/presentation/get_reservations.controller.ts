// src/modules/reservation/features/get_reservations/presentation/get_reservations.controller.ts
import { Request, Response } from "express";
import { GetReservationsSchema } from "../domain/get_reservations.schema";
import { GetReservationsService } from "./get_reservations.service";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AppError } from "../../../../../utils/errors";        // ← se mantiene la ruta usada en otros módulos
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";

export class GetReservationsController {
  constructor(private readonly svc = new GetReservationsService()) {}

  async handle(req: Request, res: Response) {
    try {
      const user = await getAuthenticatedUser(req);
      if (user.user_type !== "admin") {
        throw new AppError("FORBIDDEN", HttpStatusCodes.FORBIDDEN.code);
      }

      const dto = GetReservationsSchema.parse(req.query);
      const result = await this.svc.execute(dto);

      res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          result,
          "Reservations list"
        )
      );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }
}
