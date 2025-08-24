import { Response, Request } from "express";
import { HttpStatusCodes } from "../../../constants";
import { buildHttpResponse } from "../../../utils/build_http_response";
import { SeedService } from "./seed.service";

export class SeedController {
  constructor(private readonly service = new SeedService()) {}

  async handle(req: Request, res: Response) {
    try {
      const result = await this.service.execute();
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(HttpStatusCodes.OK.code, "Seed", req.path, result)
        );
    } catch (error) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.INTERNAL_SERVER_ERROR.code,
            "Error Seeding Database",
            req.path,
            error
          )
        );
    }
  }
}
