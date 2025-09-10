//src/modules/content/category/get_category/presentation/get_category.controller.ts
import { Request, Response } from "express";
import { GetCategoryService } from "./get_category.service";
import { GetCategoryByIdSchema } from "../domain/get_category.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants";

export class GetCategoryController {
  constructor(private readonly service = new GetCategoryService()) {}

  async list(req: Request, res: Response) {
    try {
      const categories = await this.service.list();
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Categories retrieved successfully",
            req.path,
            categories
          )
        );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = GetCategoryByIdSchema.parse(req.params);
      const category = await this.service.getById(id);
      if (!category) {
        return res
          .status(HttpStatusCodes.NOT_FOUND.code)
          .json(
            buildHttpResponse(
              HttpStatusCodes.NOT_FOUND.code,
              "Category not found",
              req.path
            )
          );
      }
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Category retrieved successfully",
            req.path,
            category
          )
        );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }
}
