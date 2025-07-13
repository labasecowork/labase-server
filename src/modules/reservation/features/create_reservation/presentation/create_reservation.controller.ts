// src/modules/reservation/features/create_reservation/presentation/create_reservation.controller.ts
import { Response } from "express";
import { CreateReservationService } from "./create_reservation.service";
import { CreateReservationSchema } from "../domain/create_reservation.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { handleServerError, handleZodError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { ZodError } from "zod";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class CreateReservationController {
  constructor(private readonly service = new CreateReservationService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    try {
      const dto = CreateReservationSchema.parse(req.body);
      const user = await getAuthenticatedUser(req);
      const result = await this.service.execute(dto, user as any);

      return res
        .status(HttpStatusCodes.CREATED.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.CREATED.code,
            result.message,
            req.path,
            {
              reservation_id: result.reservation_id,
              codeQr: result.codeQr,
              price: result.price,
              user,
            }
          )
        );
    } catch (error) {
      if (error instanceof ZodError) {
        const err = handleZodError(error, req);
        return res.status(err.status).json(err);
      }
      return handleServerError(res, req, error);
    }
  }
}
