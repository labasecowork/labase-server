// src/modules/space/features/list_spaces/presentation/controllers/list_spaces.controller.ts
import { Request, Response } from "express";                        
import { ListSpacesService } from "./list_spaces.service";
import { ListSpacesSchema } from "../domain/list_spaces.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import {
  handleServerError,
  handleZodError,
} from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { ZodError } from "zod";

export class ListSpacesController {
  constructor(private readonly service = new ListSpacesService()) {}

  async handle(req: Request, res: Response) {
    try {
      const dto = ListSpacesSchema.parse(req.query);
      const spaces = await this.service.execute(dto);

      return res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Spaces list",
          req.path,
          { spaces }
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

