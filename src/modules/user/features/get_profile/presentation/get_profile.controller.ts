import { Request, Response } from "express";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { buildHttpResponse } from "../../../../../utils";
import { GetProfileService } from "./get_profile.service";
import { handleServerError } from "../../../../../utils/error_handler";

export class GetProfileController {
  constructor(private readonly svc = new GetProfileService()) {}

  async handle(req: Request, res: Response) {
    try {
      const currentUser = await getAuthenticatedUser(req);
      const data = await this.svc.execute(currentUser);

      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Profile fetched",
            req.path,
            data
          )
        );
    } catch (error) {
      return handleServerError(res, req, error);
    }
  }
}
