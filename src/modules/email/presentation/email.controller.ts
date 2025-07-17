// src/modules/email/presentation/email.controller.ts
import { Response } from "express";
import { EmailService } from "./email.service";
import { handleServerError, handleZodError } from "../../../utils/error_handler";
import { BulkEmailSchema, BulkEmailDTO } from "../domain/dtos/bulk_email.dto";
import { ZodError } from "zod";
import { HttpStatusCodes } from "../../../constants";
import { buildHttpResponse } from "../../../utils";
import { getAuthenticatedUser } from "../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../middlewares/authenticate_token";

const emailService = new EmailService();

export class EmailController {
  async sendBulkEmail(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      const user = await getAuthenticatedUser(req);
      if (!user || user.user_type !== "admin") {
        return res.status(HttpStatusCodes.FORBIDDEN.code).json(
          buildHttpResponse(HttpStatusCodes.FORBIDDEN.code, "Only admins can send bulk emails", req.path)
        );
      }

      const data = BulkEmailSchema.parse(req.body) as BulkEmailDTO;
      const response = await emailService.sendBulkEmail(data);

      return res
        .status(HttpStatusCodes.OK.code)
        .json(buildHttpResponse(HttpStatusCodes.OK.code, response.message, req.path));
    } catch (error) {
      if (error instanceof ZodError) {
        const createdError = handleZodError(error, req);
        return res.status(createdError.status).json(createdError);
      }
      return handleServerError(res, req, error);
    }
  }
}