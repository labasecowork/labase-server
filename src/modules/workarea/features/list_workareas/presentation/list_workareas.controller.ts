// src/modules/workarea/features/list_workareas/presentation/list_workareas.controller.ts
import { Response } from "express";
import { ListWorkAreasService } from "./list_workareas.service";
import { ListWorkAreasSchema } from "../domain/list_workareas.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class ListWorkAreasController {
  constructor(private readonly service = new ListWorkAreasService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const filters = ListWorkAreasSchema.parse(req.query);
    const authUser = await getAuthenticatedUser(req);

    const user = {
      id: authUser.id,
      role: authUser.role as "admin" | "client" | "employee",
    };

    const result = await this.service.execute(filters, user);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(buildHttpResponse(HttpStatusCodes.OK.code, "OK", req.path, result));
  }
}
