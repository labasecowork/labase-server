// src/modules/space/features/edit_space/presentation/controllers/edit_space.controller.ts
import { Response } from "express";
import { EditSpaceService } from "./edit_space.service";
import { EditSpaceSchema } from "..//domain/edit_space.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { handleServerError, handleZodError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { ZodError } from "zod";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class EditSpaceController {
  constructor(private readonly service = new EditSpaceService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    try {
      const dto = EditSpaceSchema.parse(req.body);
      const updated = await this.service.execute(req.params.id, dto);
      return res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(HttpStatusCodes.OK.code, "Space updated", req.path, { space: updated })
      );
    } catch (e) {
      if (e instanceof ZodError) {
        const err = handleZodError(e, req);
        return res.status(err.status).json(err);
      }
      return handleServerError(res, req, e);
    }
  }
}
