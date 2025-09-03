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
    user: Pick<CurrentUser, "id" | "role">
  ) {
    if (user.role !== "admin") {
      throw new AppError(
        MESSAGES.VISITOR.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new AppError(
        MESSAGES.VISITOR.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    // Validar que el espacio existe si se proporciona
    if (body.space_id) {
      const space = await this.repo.findSpaceById(body.space_id);
      if (!space) {
        throw new AppError(
          MESSAGES.VISITOR.SPACE_NOT_FOUND,
          HttpStatusCodes.BAD_REQUEST.code
        );
      }
    }

    // Validar que el cliente existe
    const client = await this.repo.findClientById(body.client_id);
    if (!client) {
      throw new AppError(
        "Cliente no encontrado",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    const updated = await this.repo.update(id, {
      dni: body.dni ?? null,
      ruc: body.ruc ?? null,
      first_name: body.first_name,
      last_name: body.last_name,
      phone: body.phone ?? null,
      email: body.email ?? null,
      user_id: body.client_id,
      space_id: body.space_id,
      entry_time: new Date(body.entry_time),
      exit_time: body.exit_time ? new Date(body.exit_time) : undefined,
    });

    return { id: updated.id, message: MESSAGES.VISITOR.UPDATED_SUCCESS };
  }
}
