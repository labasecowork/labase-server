// src/modules/space/features/list_spaces/presentation/controllers/list_spaces.controller.ts
import { Response } from "express";
import { ListSpacesService } from "./list_spaces.service";
import { ListSpacesSchema } from "../domain/list_spaces.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class ListSpacesController {
  constructor(private readonly service = new ListSpacesService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = ListSpacesSchema.parse(req.query);
    const user = await getAuthenticatedUser(req);

    const spaces = await this.service.execute(dto);

    return res.status(HttpStatusCodes.OK.code).json(
      buildHttpResponse(
        HttpStatusCodes.OK.code,
        "Spaces list",
        req.path,
        { spaces }
      )
    );
  }
}
