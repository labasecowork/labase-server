// src/modules/employee/features/create_employee/presentation/create_employee.controller.ts

import { Response } from "express";
import { CreateEmployeeService } from "./create_employee.service";
import { CreateEmployeeSchema } from "../domain/create_employee.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class CreateEmployeeController {
  constructor(private readonly service = new CreateEmployeeService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    try {
      const dto = CreateEmployeeSchema.parse(req.body);
      const authUser = await getAuthenticatedUser(req);

      const user = {
        id: authUser.id,
        role: authUser.user_type as "admin" | "client" | "employee",
      };

      const result = await this.service.execute(dto, user);

      return res.status(HttpStatusCodes.CREATED.code).json(
        buildHttpResponse(
          HttpStatusCodes.CREATED.code,
          result.message,
          req.path,
          {
            employee_id: result.employee_id,
            user: result.user,
          }
        )
      );
    } catch (error) {
      return handleServerError(res, req, error);
    }
  }
}
