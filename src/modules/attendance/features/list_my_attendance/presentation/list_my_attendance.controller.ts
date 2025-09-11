import { Response } from "express";
import { ListMyAttendanceService } from "./list_my_attendance.service";
import { ListMyAttendanceSchema } from "../domain/list_my_attendance.schema";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class ListMyAttendanceController {
  constructor(private readonly service = new ListMyAttendanceService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = ListMyAttendanceSchema.parse(req.query);
    const user = await getAuthenticatedUser(req);

    const result = await this.service.execute(dto, user.id);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Mis asistencias",
          req.path,
          result
        )
      );
  }
}
