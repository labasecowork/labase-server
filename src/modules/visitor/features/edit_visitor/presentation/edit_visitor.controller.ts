// src/modules/visitor/features/edit_visitor/presentation/edit_visitor.controller.ts
import { Response } from "express";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { EditVisitorService } from "./edit_visitor.service";
import { EditVisitorSchema } from "../domain/edit_visitor.schema";
import type { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";

export class EditVisitorController {
  constructor(private readonly service = new EditVisitorService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const body = EditVisitorSchema.parse(req.body);
    const { id } = req.params;
    const user = await getAuthenticatedUser(req);

    const result = await this.service.execute(id, body, user);
    return res.status(HttpStatusCodes.OK.code).json(
      buildHttpResponse(HttpStatusCodes.OK.code, result.message, req.path, {
        id: result.id,
      })
    );
  }
}
