//src/modules/employee/features/update_config/presentation/update_config.controller.ts
import { Response, Request } from "express";
import { UpdateEmployeeConfigSchema } from "../domain/update_config.schema";
import { UpdateEmployeeConfigService } from "./update_config.service";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { isAdmin } from "../../../../../utils/permissions";
import { AppError } from "../../../../../utils/errors";

export class UpdateEmployeeConfigController {
  constructor(private readonly svc = new UpdateEmployeeConfigService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);
    if (!isAdmin(user)) {
      throw new AppError(
        "Solo los administradores pueden actualizar la configuración.",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const { employee_id } = req.params as { employee_id: string };
    const dto = UpdateEmployeeConfigSchema.parse(req.body);
    const result = await this.svc.execute(employee_id, dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          result,
          "Configuración de asistencia actualizada correctamente"
        )
      );
  }
}
