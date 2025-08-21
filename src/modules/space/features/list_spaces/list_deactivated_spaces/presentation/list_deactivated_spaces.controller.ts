// src/modules/space/features/list_spaces/presentation/controllers/list_deactivated_spaces.controller.ts
import { Response } from "express";
import { ListDeactivatedSpacesService } from "./list_deactivated_spaces.service";
import { buildHttpResponse } from "../../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../../middlewares/authenticate_token";

export class ListDeactivatedSpacesController {
  constructor(private readonly service = new ListDeactivatedSpacesService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const user = await getAuthenticatedUser(req);
    const spaces = await this.service.execute();

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Deactivated spaces list",
          req.path,
          { spaces },
        ),
      );
  }
}
