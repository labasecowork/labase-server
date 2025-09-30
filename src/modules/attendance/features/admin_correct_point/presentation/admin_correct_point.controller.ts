//src/modules/attendance/features/admin_correct_point/presentation/admin_correct_point.controller.ts
import { Response, Request } from "express";
import { AdminCorrectPointSchema } from "../domain/admin_correct_point.schema";
import { AdminCorrectPointService } from "./admin_correct_point.service";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { canCorrectPoint } from "../../../../../utils/permissions";
import { AppError } from "../../../../../utils/errors";
import { MESSAGES } from "../../../../../constants/messages";

export class AdminCorrectPointController {
  constructor(private readonly svc = new AdminCorrectPointService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);
    if (!canCorrectPoint(user)) {
      throw new AppError(
        MESSAGES.ATTENDANCE.NOT_ALLOWED,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const dto = AdminCorrectPointSchema.parse(req.body);
    const result = await this.svc.execute(dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          result
        )
      );
  }
}
