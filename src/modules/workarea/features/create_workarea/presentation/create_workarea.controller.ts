// src/modules/workarea/features/create_workarea/presentation/create_workarea.controller.ts
import { Response } from "express";
import { CreateWorkAreaService } from "./create_workarea.service";
import { CreateWorkAreaSchema } from "../domain/create_workarea.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class CreateWorkAreaController {
  constructor(private readonly service = new CreateWorkAreaService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = CreateWorkAreaSchema.parse(req.body);
    const authUser = await getAuthenticatedUser(req);

    const user = {
      id: authUser.id,
      role: authUser.role as "admin" | "client" | "employee",
    };

    const result = await this.service.execute(dto, user);

    return res.status(HttpStatusCodes.CREATED.code).json(
      buildHttpResponse(
        HttpStatusCodes.CREATED.code,
        result.message,
        req.path,
        {
          workarea: result.workarea,
        }
      )
    );
  }
}
