// src/modules/space/features/detail_space/presentation/controllers/detail_space.controller.ts
import { Request, Response } from "express";
import { DetailSpaceService } from "./detail_space.service";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class DetailSpaceController {
  constructor(private readonly service = new DetailSpaceService()) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const space = await this.service.execute(id);

      return res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Space detail",
          req.path,
          { space }
        )
      );
    } catch (e) {
      return handleServerError(res, req, e);
    }
  }
}
