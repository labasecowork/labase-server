// src/modules/product/features/brand/create_brand/presentation/controllers/create_brand.controller.ts
import { Response } from "express";
import { CreateBrandService } from "./create_brand.service";
import { CreateBrandSchema } from "../domain/create_brand.schema";
import { buildHttpResponse } from "../../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../../middlewares/authenticate_token";

export class CreateBrandController {
  constructor(private readonly service = new CreateBrandService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = CreateBrandSchema.parse(req.body);
    const user = await getAuthenticatedUser(req);

    const result = await this.service.execute(dto, user);

    return res.status(HttpStatusCodes.CREATED.code).json(
      buildHttpResponse(
        HttpStatusCodes.CREATED.code,
        result.message,
        req.path,
        {
          id: result.brand_id,
          name: dto.name,
        },
      ),
    );
  }
}
