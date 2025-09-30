import { Response, Request } from "express";
import { MarkAttendanceSchema } from "../domain/mark_attendance.schema";
import { MarkAttendanceService } from "./mark_attendance.service";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import {
  canMarkForEmployee,
  isEmployee,
} from "../../../../../utils/permissions";
import { AppError } from "../../../../../utils/errors";
import { MESSAGES } from "../../../../../constants/messages";

export class MarkAttendanceController {
  constructor(private readonly svc = new MarkAttendanceService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);
    if (!isEmployee(user)) {
      throw new AppError(
        MESSAGES.ATTENDANCE.NOT_ALLOWED,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const dto = MarkAttendanceSchema.parse(req.body);
    const employee_id = dto.employee_id ?? user.id;

    if (!canMarkForEmployee(user, employee_id)) {
      throw new AppError(
        MESSAGES.ATTENDANCE.NOT_ALLOWED,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const result = await this.svc.execute({
      ...dto,
      requester_employee_id: user.id,
    });

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
