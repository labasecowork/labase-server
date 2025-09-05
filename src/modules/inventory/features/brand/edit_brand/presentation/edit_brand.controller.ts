// src/modules/product/features/brand/edit_brand/presentation/edit_brand.controller.ts
import { Response } from "express";
import { EditBrandService } from "./edit_brand.service";
import { EditBrandSchema } from "../domain/edit_brand.schema";
import { getAuthenticatedUser } from "../../../../../../utils/authenticated_user";
import { buildHttpResponse } from "../../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../../middlewares/authenticate_token";

export class EditBrandController {
  constructor(private readonly service = new EditBrandService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    // Zod se ejecuta una vez en el controller
    const dto = EditBrandSchema.parse(req.body);
    const user = await getAuthenticatedUser(req);
    const id = req.params.id;

    const updated = await this.service.execute(id, dto, user);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Brand updated",
          req.path,
          updated,
        ),
      );
  }
}
