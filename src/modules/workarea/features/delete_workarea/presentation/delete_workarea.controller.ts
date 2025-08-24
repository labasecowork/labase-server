// src/modules/workarea/features/delete_workarea/presentation/delete_workarea.controller.ts
import { Response } from "express";
import { DeleteWorkAreaService } from "./delete_workarea.service";
import { DeleteWorkAreaParamsSchema } from "../domain/delete_workarea.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class DeleteWorkAreaController {
  constructor(private readonly service = new DeleteWorkAreaService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const params = DeleteWorkAreaParamsSchema.parse(req.params);
    const authUser = await getAuthenticatedUser(req);

    const user = {
      id: authUser.id,
      role: authUser.role as "admin" | "client" | "employee",
    };

    const result = await this.service.execute(params.id, user);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(HttpStatusCodes.OK.code, result.message, req.path)
      );
  }
}
