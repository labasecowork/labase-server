// src/modules/space/features/create_space/presentation/controllers/create_space.controller.ts
import { Response } from "express";
import { CreateSpaceService } from "./create_space.service";          // ← ruta corregida
import { CreateSpaceSchema } from "../domain/create_space.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import {
  handleServerError,
  handleZodError,
} from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { ZodError } from "zod";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class CreateSpaceController {
  constructor(private readonly service = new CreateSpaceService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    try {
      const dto = CreateSpaceSchema.parse(req.body);

      const userRecord = await getAuthenticatedUser(req);
      if (!userRecord) {
        return res
          .status(HttpStatusCodes.UNAUTHORIZED.code)
          .json(buildHttpResponse(
            HttpStatusCodes.UNAUTHORIZED.code,
            "Usuario no autenticado",
            req.path
          ));
      }

      const currentUser = {
        id: userRecord.id,                                  
        role: userRecord.user_type as "client" | "admin",
      } as const;

      const result = await this.service.execute(dto, currentUser);
      const response = {
        id: result.space_id,
        ...dto,
      };

      return res.status(HttpStatusCodes.CREATED.code).json(
        buildHttpResponse(
          HttpStatusCodes.CREATED.code,
          result.message,
          req.path,
          { space: response, user: userRecord }
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
