// src/modules/user/features/edit_profile/presentation/edit_profile.controller.ts
import { Request, Response } from "express";
import { ZodError } from "zod";

import { EditProfileSchema } from "../domain/edit_profile.schema";
import { EditProfileService } from "./edit_profile.service";   // ← ruta correcta
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";

export class EditProfileController {
  constructor(private readonly svc = new EditProfileService()) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const dto = EditProfileSchema.parse(req.body);

      const currentUser = await getAuthenticatedUser(req);

      const data = await this.svc.execute(dto, currentUser);

      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Profile updated",
            req.path,
            data,
          ),
        );
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(HttpStatusCodes.BAD_REQUEST.code)
          .json(
            buildHttpResponse(
              HttpStatusCodes.BAD_REQUEST.code,
              "Invalid payload",
              req.path,
              error.flatten(),
            ),
          );
      }

      return handleServerError(res, req, error);
    }
  }
}
