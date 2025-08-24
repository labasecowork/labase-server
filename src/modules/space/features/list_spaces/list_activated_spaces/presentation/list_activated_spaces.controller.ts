// src/modules/space/features/list_spaces/list_activated_spaces/presentation/controllers/list_activated_spaces.controller.ts
import { Response } from "express";
import { ListActivatedSpacesService } from "./list_activated_spaces.service";
import { ListActivatedSpacesSchema } from "../domain/list_activated_spaces.schema";
import { buildHttpResponse } from "../../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../../middlewares/authenticate_token";

export class ListActivatedSpacesController {
  constructor(private readonly service = new ListActivatedSpacesService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = ListActivatedSpacesSchema.parse(req.query);
    await getAuthenticatedUser(req);

    const spaces = await this.service.execute(dto);

    return res.status(HttpStatusCodes.OK.code).json(
      buildHttpResponse(HttpStatusCodes.OK.code, "Spaces list", req.path, {
        spaces,
      }),
    );
  }
}
