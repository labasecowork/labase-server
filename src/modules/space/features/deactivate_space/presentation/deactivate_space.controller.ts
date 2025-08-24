// src/modules/space/features/deactivate_space/presentation/deactivate_space.controller.ts
import { Response } from "express";
import { DeactivateSpaceService } from "./deactivate_space.service";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";

export class DeactivateSpaceController {
  constructor(private readonly service = new DeactivateSpaceService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const user = await getAuthenticatedUser(req);
    const space = await this.service.execute(req.params.id);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Space deactivated",
          req.path,
          { space, user },
        ),
      );
  }
}
