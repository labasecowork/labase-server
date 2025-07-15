//src/modules/waitlist/presentation/waitlist.controller.ts
import { Request, Response } from "express";
import { SubscribeNewsletterDTO, subscribeNewsletterSchema } from "../domain/newsletter.dto";
import { SubscribeNewsletterService } from "./newsletter.service";
import { SubscribeNewsletterRepository } from "../data/newsletter.repository";
import { handleZodError, handleServerError } from "../../../utils/error_handler";
import { buildHttpResponse } from "../../../utils";
import { HttpStatusCodes } from "../../../constants";
import { ZodError } from "zod";

const repository = new SubscribeNewsletterRepository();
const service = new SubscribeNewsletterService(repository);

export class SubscribeNewsletterController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const data = subscribeNewsletterSchema.parse(req.body) as SubscribeNewsletterDTO;
      const message = await service.execute(data);

      return res.status(HttpStatusCodes.CREATED.code).json(
        buildHttpResponse(HttpStatusCodes.CREATED.code, message, req.path)
      );
    } catch (error) {
      if (error instanceof ZodError) {
        const createdError = handleZodError(error, req);
        return res.status(createdError.status).json(createdError);
      }
      return handleServerError(res, req, error);
    }
  }
}
