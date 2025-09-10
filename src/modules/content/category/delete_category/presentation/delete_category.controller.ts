//src/modules/content/category/delete_category/presentation/delete_category.controller.ts
import { Request, Response } from "express";
import { DeleteCategoryService } from "./delete_category.service";
import { DeleteCategoryParamsSchema } from "../domain/delete_category.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants";

export class DeleteCategoryController {
  constructor(private readonly service = new DeleteCategoryService()) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = DeleteCategoryParamsSchema.parse(req.params);
      const result = await this.service.execute(id);
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            result.message,
            req.path,
            result
          )
        );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }
}
