// src/modules/attendance/features/mark_attendance/presentation/mark_attendance.controller.ts

import { Response } from "express";
import { MarkAttendanceService } from "./mark_attendance.service";
import { MarkAttendanceSchema } from "../domain/mark_attendance.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import {
  handleServerError,
  handleZodError,
} from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { ZodError } from "zod";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class MarkAttendanceController {
  constructor(private readonly service = new MarkAttendanceService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    try {
      const dto = MarkAttendanceSchema.parse(req.body);
      const authUser = await getAuthenticatedUser(req);

      const user = {
        id: authUser.id,
        role: authUser.user_type as "admin" | "client",
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
    } catch (error) {
      if (error instanceof ZodError) {
        const err = handleZodError(error, req);
        return res.status(err.status).json(err);
      }
      return handleServerError(res, req, error);
    }
  }
}
