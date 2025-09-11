import { GetArticleRepository } from "../data/get_article.repository";
import { buildPaginationMeta, getPaginationParams } from "../../../../../utils";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";
import { MESSAGES } from "../../../../../constants/messages";

export class GetArticleService {
  constructor(private readonly repo = new GetArticleRepository()) {}

  async list(query: any) {
    const { page, limit, skip } = getPaginationParams(query);
    const [rows, total] = await Promise.all([
      this.repo.findMany(skip, limit),
      this.repo.count(),
    ]);

    return {
      data: rows,
      meta: buildPaginationMeta(total, page, limit),
    };
  }

  async getById(id: string) {
    const found = await this.repo.findById(id);
    if (!found) {
      throw new AppError(
        MESSAGES.ARTICLE.ARTICLE_ERROR_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    return found;
  }
}
