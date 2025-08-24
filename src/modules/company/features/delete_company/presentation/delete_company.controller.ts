// src/modules/company/features/delete_company/presentation/delete_company.controller.ts
import { Response } from "express";
import { DeleteCompanyService } from "./delete_company.service";
import { DeleteCompanyParamsSchema } from "../domain/delete_company.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class DeleteCompanyController {
  constructor(private readonly service = new DeleteCompanyService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const params = DeleteCompanyParamsSchema.parse(req.params);
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
