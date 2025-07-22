import { Response } from "express";
import { EmailService } from "./bulk_email.service";
import { handleServerError } from "../../../utils/error_handler";
import { BulkEmailSchema, BulkEmailDTO } from "../domain/dtos/bulk_email.dto";
import { HttpStatusCodes } from "../../../constants";
import { AppError, buildHttpResponse } from "../../../utils";
import { getAuthenticatedUser } from "../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../middlewares/authenticate_token";

const emailService = new EmailService();

export class EmailController {
  async sendBulkEmail(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response> {
    try {
      const user = await getAuthenticatedUser(req);
      if (user.user_type !== "admin") {
        throw new AppError(
          "Unauthorized, user not admin",
          HttpStatusCodes.UNAUTHORIZED.code
        );
      }

      const data = BulkEmailSchema.parse(req.body) as BulkEmailDTO;
      const response = await emailService.sendBulkEmail(data);

      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(HttpStatusCodes.OK.code, response.message, req.path)
        );
    } catch (error) {
      return handleServerError(res, req, error);
    }
  }
}
