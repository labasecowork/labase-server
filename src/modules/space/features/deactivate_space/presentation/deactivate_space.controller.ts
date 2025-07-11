// src/modules/space/features/deactivate_space/presentation/deactivate_space.controller.ts
import { Response } from "express";
import { DeactivateSpaceService } from "./deactivate_space.service";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class DeactivateSpaceController {
  constructor(private readonly service = new DeactivateSpaceService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    try {
      const space = await this.service.execute(req.params.id);
      return res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Space deactivated",
          req.path,
          { space }
        )
      );
    } catch (e) {
      return handleServerError(res, req, e);
    }
  }
}
