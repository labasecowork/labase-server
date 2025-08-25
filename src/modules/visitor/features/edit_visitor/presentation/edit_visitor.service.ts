// src/modules/visitor/features/edit_visitor/presentation/edit_visitor.service.ts
import { EditVisitorRepository } from "../data/edit_visitor.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../constants/messages";
import type { CurrentUser } from "../../../../../utils/authenticated_user";
import { z } from "zod";
import { EditVisitorSchema } from "../domain/edit_visitor.schema";

export class EditVisitorService {
  constructor(private readonly repo = new EditVisitorRepository()) {}

  async execute(
    id: string,
    body: z.infer<typeof EditVisitorSchema>,
    user: Pick<CurrentUser, "id" | "role">,
  ) {
    if (user.role !== "admin") {
      throw new AppError(
        MESSAGES.VISITOR.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code,
      );
    }

    const existing = await this.repo.findById(id);
    if (!existing)
      throw new AppError(
        MESSAGES.VISITOR.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code,
      );

    if (body.space_id) {
      const space = await this.repo.findSpaceById(body.space_id);
      if (!space)
        throw new AppError(
          MESSAGES.VISITOR.SPACE_NOT_FOUND,
          HttpStatusCodes.BAD_REQUEST.code,
        );
    }

    // Evitar pisar salida si ya se registró
    if (existing.exit_time && body.exit_time) {
      throw new AppError(
        MESSAGES.VISITOR.ALREADY_CHECKED_OUT,
        HttpStatusCodes.CONFLICT.code,
      );
    }

    const updated = await this.repo.update(id, {
      phone: body.phone ?? null,
      email: body.email ?? null,
      company: body.company ?? null,
      exit_time: body.exit_time ? new Date(body.exit_time) : undefined,
      space_id: body.space_id ?? undefined,
    });

    return { id: updated.id, message: MESSAGES.VISITOR.UPDATED_SUCCESS };
  }
}
