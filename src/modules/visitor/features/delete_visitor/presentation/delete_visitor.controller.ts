// src/modules/visitor/features/delete_visitor/presentation/delete_visitor.controller.ts
import { Response } from "express";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { DeleteVisitorService } from "./delete_visitor.service";

export class DeleteVisitorController {
  constructor(private readonly service = new DeleteVisitorService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const user = await getAuthenticatedUser(req);
    const result = await this.service.execute(id, user);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(HttpStatusCodes.OK.code, result.message, req.path),
      );
  }
}
