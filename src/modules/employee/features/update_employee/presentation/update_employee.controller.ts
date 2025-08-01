// src/modules/employee/features/update_employee/presentation/update_employee.controller.ts

import { Response } from "express";
import { UpdateEmployeeService } from "./update_employee.service";
import {
  UpdateEmployeeParamsSchema,
  UpdateEmployeeBodySchema,
} from "../domain/update_employee.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import {
  handleServerError,
  handleZodError,
} from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { ZodError } from "zod";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class UpdateEmployeeController {
  constructor(private readonly service = new UpdateEmployeeService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    try {
      const params = UpdateEmployeeParamsSchema.parse(req.params);
      const body = UpdateEmployeeBodySchema.parse(req.body);
      const authUser = await getAuthenticatedUser(req);

      const user = {
        id: authUser.id,
        role: authUser.user_type as "admin" | "client" | "employee",
      };

      const result = await this.service.execute(params.id, body, user);

      return res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(HttpStatusCodes.OK.code, result.message, req.path, {
          employee_id: result.employee_id,
          user: result.user,
        })
      );
    } catch (error) {
      if (error instanceof ZodError) {
        const err = handleZodError(error, req);
        return res.status(err.status).json(err);
      }
      return handleServerError(res, req, error);
    }
  }
}
