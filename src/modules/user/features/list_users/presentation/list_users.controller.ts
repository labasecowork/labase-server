import { Response } from "express";
import { ListUsersService } from "./list_users.service";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class ListUsersController {
  constructor(private readonly service = new ListUsersService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    await getAuthenticatedUser(req);

    const users = await this.service.execute();

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Users list",
          req.path,
          users
        )
      );
  }
}
