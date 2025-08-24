// src/modules/workarea/features/list_workareas/presentation/list_workareas.service.ts
import { ListWorkAreasRepository } from "../data/list_workareas.repository";
import {
  ListWorkAreasDTO,
  ListWorkAreasResponseDTO,
} from "../domain/list_workareas.dto";
import { throwError } from "../../../../../utils/errors";

export class ListWorkAreasService {
  constructor(private readonly repository = new ListWorkAreasRepository()) {}

  async execute(
    filters: ListWorkAreasDTO,
    user: { id: string; role: "admin" | "client" | "employee" }
  ): Promise<ListWorkAreasResponseDTO> {
    // Verificar que solo administradores puedan listar áreas de trabajo
    if (user.role !== "admin") {
      throwError(
        "FORBIDDEN",
        "Solo los administradores pueden acceder a esta información"
      );
    }

    return await this.repository.execute(filters);
  }
}
