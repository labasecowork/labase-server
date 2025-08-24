// src/modules/public_contact/presentation/public_contact.controller.ts
import { Request, Response } from "express";
import { HttpStatusCodes } from "../../../constants/http_status_codes";
import { buildHttpResponse } from "../../../utils";
import { publicContactSchema } from "../domain/public_contact.schema";
import { publicContactService } from "./public_contact.service";

export class PublicContactController {
  async handle(req: Request, res: Response): Promise<Response> {
    const dto = publicContactSchema.parse(req.body);
    await publicContactService(dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Message sent successfully",
          req.path,
          null,
        ),
      );
  }
}
