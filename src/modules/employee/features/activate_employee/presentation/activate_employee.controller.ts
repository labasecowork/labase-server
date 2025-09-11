import { Response } from "express";
import { ActivateEmployeeService } from "./activate_employee.service";
import { ActivateEmployeeParamsSchema } from "../domain/activate_employee.schema";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class ActivateEmployeeController {
  constructor(private readonly service = new ActivateEmployeeService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const params = ActivateEmployeeParamsSchema.parse(req.params);
    const authUser = await getAuthenticatedUser(req);

    const user = {
      id: authUser.id,
      role: authUser.role as "admin" | "client" | "employee",
    };

    const result = await this.service.execute(params.id, user);

    return res.status(HttpStatusCodes.OK.code).json(
      buildHttpResponse(HttpStatusCodes.OK.code, result.message, req.path, {
        employee_id: result.employee_id,
        user: result.user,
      })
    );
  }
}
