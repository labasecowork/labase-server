//src/modules/content/article/get_article/presentation/get_article.service.ts
import { GetArticleRepository } from "../data/get_article.repository";
import { Pagination } from "../../../../../utils/pagination";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants";
import { MESSAGES } from "../../../../../constants/messages";

export class GetArticleService {
  constructor(private readonly repo = new GetArticleRepository()) {}

  async list(query: any) {
    const { page, limit, skip } = Pagination.getPaginationParams(query);
    const [rows, total] = await Promise.all([
      this.repo.findMany(skip, limit),
      this.repo.count(),
    ]);

    return {
      data: rows,
      meta: Pagination.buildPaginationMeta(total, page, limit),
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
