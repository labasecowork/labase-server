// src/modules/attendance/features/mark_attendance/presentation/mark_attendance.controller.ts

import { Response } from "express";
import { MarkAttendanceService } from "./mark_attendance.service";
import { MarkAttendanceSchema } from "../domain/mark_attendance.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class MarkAttendanceController {
  constructor(private readonly service = new MarkAttendanceService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = MarkAttendanceSchema.parse(req.body);
    const authUser = await getAuthenticatedUser(req);

    const user = {
      id: authUser.id,
      role: authUser.role,
    };

    const result = await this.service.execute(dto, user);

    return res.status(HttpStatusCodes.CREATED.code).json(
      buildHttpResponse(
        HttpStatusCodes.CREATED.code,
        result.message,
        req.path,
        {
          attendance_id: result.attendance_id,
          type: result.type,
          date: result.date,
          check_time: result.check_time,
          user: authUser,
        }
      )
    );
  }
}
