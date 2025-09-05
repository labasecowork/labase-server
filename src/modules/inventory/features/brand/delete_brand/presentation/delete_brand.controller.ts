// src/modules/product/features/brand/delete_brand/presentation/delete_brand.controller.ts
import { Response } from "express";
import { DeleteBrandService } from "./delete_brand.service";
import { getAuthenticatedUser } from "../../../../../../utils/authenticated_user";
import { buildHttpResponse } from "../../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../../middlewares/authenticate_token";

export class DeleteBrandController {
  constructor(private readonly service = new DeleteBrandService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const user = await getAuthenticatedUser(req);
    const id = req.params.id;

    const result = await this.service.execute(id, user);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(HttpStatusCodes.OK.code, result.message, req.path),
      );
  }
}
