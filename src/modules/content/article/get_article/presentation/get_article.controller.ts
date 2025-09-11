import { Request, Response } from "express";
import { GetArticleService } from "./get_article.service";
import { GetArticleByIdSchema } from "../domain/get_article.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants";

export class GetArticleController {
  constructor(private readonly service = new GetArticleService()) {}

  async list(req: Request, res: Response) {
    try {
      const result = await this.service.list(req.query);
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Articles retrieved successfully",
            req.path,
            result
          )
        );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = GetArticleByIdSchema.parse(req.params);
      const article = await this.service.getById(id);
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Article retrieved successfully",
            req.path,
            article
          )
        );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }
}
