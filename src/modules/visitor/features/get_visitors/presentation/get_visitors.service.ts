import { GetVisitorsRepository } from "../data/get_visitors.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../constants/messages";
import type { z } from "zod";
import { GetVisitorsQuerySchema } from "../domain/get_visitors.schema";

export class GetVisitorsService {
  constructor(private readonly repo = new GetVisitorsRepository()) {}

  async getOne(id: string) {
    const v = await this.repo.findById(id);
    if (!v) {
      throw new AppError(
        MESSAGES.VISITOR.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    return v;
  }

  async getAll(query: z.infer<typeof GetVisitorsQuerySchema>) {
    const { page, limit, search, host_user_id, space_id, date_from, date_to } =
      query;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.repo.findMany({
        skip,
        take: limit,
        search,
        host_user_id,
        space_id,
        date_from: date_from ? new Date(date_from) : undefined,
        date_to: date_to ? new Date(date_to) : undefined,
      }),
      this.repo.count({
        search,
        host_user_id,
        space_id,
        date_from: date_from ? new Date(date_from) : undefined,
        date_to: date_to ? new Date(date_to) : undefined,
      }),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    };
  }
}
