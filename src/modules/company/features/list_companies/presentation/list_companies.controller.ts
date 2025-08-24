// src/modules/company/features/list_companies/presentation/list_companies.controller.ts
import { Response } from "express";
import { ListCompaniesService } from "./list_companies.service";
import { ListCompaniesSchema } from "../domain/list_companies.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class ListCompaniesController {
  constructor(private readonly service = new ListCompaniesService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const filters = ListCompaniesSchema.parse(req.query);
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
