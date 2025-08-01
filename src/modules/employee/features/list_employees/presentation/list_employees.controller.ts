// src/modules/employee/features/list_employees/presentation/list_employees.controller.ts
import { Request, Response } from "express";
import { ListEmployeesSchema } from "../domain/list_employees.schema";
import { ListEmployeesService } from "./list_employees.service";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AppError } from "../../../../../utils/errors";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";

export class ListEmployeesController {
  constructor(private readonly svc = new ListEmployeesService()) {}

  async handle(req: Request, res: Response) {
    try {
      const user = await getAuthenticatedUser(req);
      if (user.user_type !== "admin") {
        throw new AppError(
          "Solo los administradores pueden ver la lista de empleados",
          HttpStatusCodes.FORBIDDEN.code
        );
      }

      const dto = ListEmployeesSchema.parse(req.query);
      const result = await this.svc.execute(dto);

      res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            HttpStatusCodes.OK.message,
            req.path,
            result,
            "Lista de empleados"
          )
        );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }
}
