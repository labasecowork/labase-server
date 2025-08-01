// src/modules/attendance/features/list_all_attendance/presentation/list_all_attendance.controller.ts
import { Request, Response } from "express";
import { ListAllAttendanceSchema } from "../domain/list_all_attendance.schema";
import { ListAllAttendanceService } from "./list_all_attendance.service";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AppError } from "../../../../../utils/errors";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";

export class ListAllAttendanceController {
  constructor(private readonly svc = new ListAllAttendanceService()) {}

  async handle(req: Request, res: Response) {
    try {
      const user = await getAuthenticatedUser(req);
      if (user.user_type !== "admin") {
        throw new AppError(
          "Solo los administradores pueden ver todas las asistencias",
          HttpStatusCodes.FORBIDDEN.code
        );
      }

      const dto = ListAllAttendanceSchema.parse(req.query);
      const result = await this.svc.execute(dto);

      res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            HttpStatusCodes.OK.message,
            req.path,
            result,
            "Lista de todas las asistencias"
          )
        );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }
}
