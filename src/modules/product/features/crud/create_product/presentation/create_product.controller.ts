// src/modules/product/features/create_product/presentation/controllers/create_product.controller.ts
import { Response } from "express";
import { CreateProductService } from "./create_product.service";
import { CreateProductSchema } from "../domain/create_product.schema";
import { uploadFile } from "../../../../../../infrastructure/aws";
import { buildHttpResponse } from "../../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../../middlewares/authenticate_token";

export class CreateProductController {
  constructor(private readonly service = new CreateProductService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = CreateProductSchema.parse(JSON.parse(req.body.data));
    const files = req.files as Express.Multer.File[] | undefined;
    const user = await getAuthenticatedUser(req);

    const imageUrl = files?.[0]
      ? (await uploadFile(files[0], "public/products/img")).url
      : "";

    const result = await this.service.execute(dto, user, imageUrl);

    return res.status(HttpStatusCodes.CREATED.code).json(
      buildHttpResponse(
        HttpStatusCodes.CREATED.code,
        result.message,
        req.path,
        {
          id: result.product_id,
          name: dto.name,
          brand_id: dto.brand_id,
          quantity: dto.quantity,
          unit_of_measure: dto.unit_of_measure,
          photo_url: imageUrl,
        },
      ),
    );
  }
}
