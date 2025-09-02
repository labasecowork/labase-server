// src/modules/company/features/create_company/presentation/create_company.controller.ts
import { Response } from "express";
import { CreateCompanyService } from "./create_company.service";
import { CreateCompanySchema } from "../domain/create_company.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class CreateCompanyController {
  constructor(private readonly service = new CreateCompanyService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = CreateCompanySchema.parse(req.body);
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
          company: result.company,
        }
      )
    );
  }
}
