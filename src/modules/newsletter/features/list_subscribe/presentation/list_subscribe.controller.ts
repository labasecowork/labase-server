// src/modules/newsletter/features/list_subscribe/presentation/list_subscribe.controller.ts
import { Request, Response } from "express";
import { ListSubscribeService } from "./list_subscribe.service";
import { ListSubscribeRepository } from "../data/list_subscribe.repository";
import { AppError, buildHttpResponse } from "../../../../../utils";
import { HttpStatusCodes } from "../../../../../constants";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";

const repository = new ListSubscribeRepository();
const service = new ListSubscribeService(repository);

export class ListSubscribeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const user = await getAuthenticatedUser(req);
    if (user.role !== "admin") {
      throw new AppError(
        "Unauthorized, user not admin",
        HttpStatusCodes.UNAUTHORIZED.code
      );
    }

    const data = await service.execute();

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Lista de suscriptores obtenida exitosamente",
          req.path,
          data
        )
      );
  }
}
