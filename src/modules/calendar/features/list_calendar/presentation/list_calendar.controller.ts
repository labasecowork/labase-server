// src/modules/calendar/features/list_calendar/presentation/list_calendar.controller.ts
import { Request, Response } from "express";
import {
  ListCalendarSchema,
  ListCalendarDTO,
} from "../domain/list_calendar.schema";
import { ListCalendarService } from "./list_calendar.service";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class ListCalendarController {
  constructor(private readonly svc = new ListCalendarService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);

    const dto: ListCalendarDTO = ListCalendarSchema.parse(req.query);
    const events = await this.svc.execute(user, dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          events
        )
      );
  }
}
