import { Request, Response } from "express";
import { HttpStatusCodes } from "../../../constants/http_status_codes";
import { buildHttpResponse } from "../../../utils";
import { handleServerError } from "../../../utils/error_handler";
import { publicContactSchema } from "../domain/public_contact.schema";
import { publicContactService } from "./public_contact.service";


export class PublicContactController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const dto = publicContactSchema.parse(req.body);
      await publicContactService(dto);

      return res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Mensaje enviado correctamente",
          req.path,
          null
        )
      );
    } catch (error) {
      return handleServerError(res, req, error);
    }
  }
}