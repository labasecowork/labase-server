// src/modules/visitor/features/lookup_visitor/presentation/lookup.controller.ts
import { Response } from "express";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";
import { z } from "zod";
import {
  DecolectaClient,
  normalizeReniecToVisitor,
  normalizeSunatToVisitor,
} from "../../../../../shared/decolecta/decolecta.client";
import { MESSAGES } from "../../../../../constants/messages";

const QuerySchema = z
  .object({
    dni: z.string().length(8).optional(),
    ruc: z.string().length(11).optional(),
  })
  .refine((v) => v.dni || v.ruc, { message: "dni or ruc required" });

export class LookupVisitorController {
  private client = new DecolectaClient();

  async handle(req: AuthenticatedRequest, res: Response) {
    const { dni, ruc } = QuerySchema.parse(req.query);

    if (dni) {
      const data = await this.client.lookupByDni(dni);
      if (!data) {
        return res
          .status(HttpStatusCodes.NOT_FOUND.code)
          .json(
            buildHttpResponse(
              HttpStatusCodes.NOT_FOUND.code,
              MESSAGES.VISITOR.LOOKUP_NOT_FOUND,
              req.path,
            ),
          );
      }
      const payload = normalizeReniecToVisitor(data);
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Lookup ok",
            req.path,
            payload,
          ),
        );
    }

    if (ruc) {
      const data = await this.client.lookupByRuc(ruc);
      if (!data) {
        return res
          .status(HttpStatusCodes.NOT_FOUND.code)
          .json(
            buildHttpResponse(
              HttpStatusCodes.NOT_FOUND.code,
              MESSAGES.VISITOR.LOOKUP_NOT_FOUND,
              req.path,
            ),
          );
      }
      const payload = normalizeSunatToVisitor(data, ruc);
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Lookup ok",
            req.path,
            payload,
          ),
        );
    }

    return res
      .status(HttpStatusCodes.BAD_REQUEST.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.BAD_REQUEST.code,
          "dni or ruc required",
          req.path,
        ),
      );
  }
}
