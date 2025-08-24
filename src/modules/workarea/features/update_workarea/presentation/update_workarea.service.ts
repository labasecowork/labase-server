// src/modules/workarea/features/update_workarea/presentation/update_workarea.service.ts
import { UpdateWorkAreaRepository } from "../data/update_workarea.repository";
import {
  UpdateWorkAreaDTO,
  UpdateWorkAreaResponseDTO,
} from "../domain/update_workarea.dto";
import { throwError } from "../../../../../utils/errors";

export class UpdateWorkAreaService {
  constructor(private readonly repository = new UpdateWorkAreaRepository()) {}

  async execute(
    id: string,
    data: UpdateWorkAreaDTO,
    user: { id: string; role: "admin" | "client" | "employee" }
  ): Promise<UpdateWorkAreaResponseDTO> {
    // Verificar que solo administradores puedan actualizar áreas de trabajo
    if (user.role !== "admin") {
      throwError(
        "FORBIDDEN",
        "Solo los administradores pueden actualizar áreas de trabajo"
      );
    }

    // Verificar que el área de trabajo existe
    const existingWorkArea = await this.repository.findById(id);
    if (!existingWorkArea) {
      throwError("NOT_FOUND", "Área de trabajo no encontrada");
    }

    // Verificar si el nuevo nombre ya existe (si se está cambiando el nombre)
    if (data.name && data.name !== existingWorkArea.name) {
      const nameExists = await this.repository.checkIfNameExistsExcludingId(
        data.name,
        id
      );
      if (nameExists) {
        throwError("CONFLICT", "Ya existe un área de trabajo con este nombre");
      }
    }

    // Actualizar el área de trabajo
    const workarea = await this.repository.execute(id, data);

    return {
      message: "Área de trabajo actualizada exitosamente",
      workarea,
    };
  }
}
