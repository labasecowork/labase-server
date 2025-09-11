import { Request, Response } from "express";
import { GetEmployeeSchema } from "../domain/get_employee.schema";
import { GetEmployeeService } from "./get_employee.service";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";
import { AppError } from "../../../../../types/";

export class GetEmployeeController {
  constructor(private readonly svc = new GetEmployeeService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden ver la información de empleados",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const dto = GetEmployeeSchema.parse({ id: req.params.id });
    const result = await this.svc.execute(dto);

    res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          result,
          "Información del empleado"
        )
      );
  }
}
