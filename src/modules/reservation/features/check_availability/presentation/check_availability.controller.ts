// src/modules/reservation/features/check_availability/presentation/check_availability.controller.ts
import { Request, Response } from "express";
import { CheckAvailabilityService } from "./check_availability.service";
import { CheckAvailabilitySchema } from "../domain/check_availability.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import {
  handleServerError,
  handleZodError,
} from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { ZodError } from "zod";

export class CheckAvailabilityController {
  constructor(private readonly service = new CheckAvailabilityService()) {}

  async handle(req: Request, res: Response) {
    try {
      const dto = CheckAvailabilitySchema.parse(req.body);
      const result = await this.service.execute(dto);
      return res.status(HttpStatusCodes.OK.code).json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Availability checked",
          req.path,
          result
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
