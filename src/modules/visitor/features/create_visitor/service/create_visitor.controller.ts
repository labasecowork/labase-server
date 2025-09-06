// src/modules/visitor/features/create_visitor/service/create_visitor.controller.ts
import { Response } from "express";
import { CreateVisitorService } from "./create_visitor.service";
import { CreateVisitorSchema } from "../domain/create_visitor.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class CreateVisitorController {
  constructor(private readonly service = new CreateVisitorService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = CreateVisitorSchema.parse(req.body);
    const user = await getAuthenticatedUser(req);
    const result = await this.service.execute(dto, user);

    return res.status(HttpStatusCodes.CREATED.code).json(
      buildHttpResponse(
        HttpStatusCodes.CREATED.code,
        result.message,
        req.path,
        {
          id: result.id,
          first_name: dto.first_name,
          last_name: dto.last_name,
        }
      )
    );
  }
}
