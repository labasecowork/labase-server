import { EditVisitorRepository } from "../data/edit_visitor.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../constants/messages";
import type { CurrentUser } from "../../../../../utils/";
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

    // Validaciones de existencia para relaciones
    if (body.space_id) {
      const space = await this.repo.findSpaceById(body.space_id);
      if (!space) {
        throw new AppError(
          MESSAGES.VISITOR.SPACE_NOT_FOUND,
          HttpStatusCodes.BAD_REQUEST.code
        );
      }
    }

    if (body.host_user_id) {
      const host = await this.repo.findHostByUserId(body.host_user_id);
      if (!host) {
        throw new AppError(
          MESSAGES.VISITOR.HOST_NOT_FOUND,
          HttpStatusCodes.BAD_REQUEST.code
        );
      }
    }

    if (body.company_id !== undefined && body.company_id !== null) {
      const company = await this.repo.findCompanyById(body.company_id);
      if (!company) {
        throw new AppError(
          MESSAGES.VISITOR.COMPANY_NOT_FOUND,
          HttpStatusCodes.BAD_REQUEST.code
        );
      }
    }

    // Regla: no permitir sobreescribir exit_time si ya existe
    if (existing.exit_time && body.exit_time) {
      throw new AppError(
        MESSAGES.VISITOR.ALREADY_CHECKED_OUT,
        HttpStatusCodes.CONFLICT.code
      );
    }

    // Coherencia si cambian entry_time y ya hay exit_time
    if (body.entry_time && existing.exit_time) {
      const newEntry = new Date(body.entry_time);
      if (newEntry.getTime() > new Date(existing.exit_time).getTime()) {
        throw new AppError(
          "La nueva hora de ingreso no puede ser mayor que la hora de salida ya registrada",
          HttpStatusCodes.BAD_REQUEST.code
        );
      }
    }

    const updated = await this.repo.update(id, {
      dni: body.dni ?? undefined,
      ruc: body.ruc ?? undefined,
      first_name: body.first_name ?? undefined,
      last_name: body.last_name ?? undefined,
      phone: body.phone ?? undefined,
      email: body.email ?? undefined,
      entry_time: body.entry_time ? new Date(body.entry_time) : undefined,
      exit_time: body.exit_time ? new Date(body.exit_time) : undefined,
      host_user_id: body.host_user_id ?? undefined,
      company_id: body.company_id ?? undefined, // null = disconnect, uuid = connect
      space_id: body.space_id ?? undefined,
    });

    return { id: updated.id, message: MESSAGES.VISITOR.UPDATED_SUCCESS };
  }
}
