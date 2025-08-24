// src/modules/company/features/update_company/presentation/update_company.service.ts
import { UpdateCompanyRepository } from "../data/update_company.repository";
import {
  UpdateCompanyDTO,
  UpdateCompanyResponseDTO,
} from "../domain/update_company.dto";
import { throwError } from "../../../../../utils/errors";

export class UpdateCompanyService {
  constructor(private readonly repository = new UpdateCompanyRepository()) {}

  async execute(
    id: string,
    data: UpdateCompanyDTO,
    user: { id: string; role: "admin" | "client" | "employee" }
  ): Promise<UpdateCompanyResponseDTO> {
    // Verificar que solo administradores puedan actualizar empresas
    if (user.role !== "admin") {
      throwError(
        "FORBIDDEN",
        "Solo los administradores pueden actualizar empresas"
      );
    }

    // Verificar que la empresa existe
    const existingCompany = await this.repository.findById(id);
    if (!existingCompany) {
      throwError("NOT_FOUND", "Empresa no encontrada");
    }

    // Verificar si el nuevo nombre ya existe (si se está cambiando el nombre)
    if (data.name && data.name !== existingCompany.name) {
      const nameExists = await this.repository.checkIfNameExistsExcludingId(
        data.name,
        id
      );
      if (nameExists) {
        throwError("CONFLICT", "Ya existe una empresa con este nombre");
      }
    }

    // Actualizar la empresa
    const company = await this.repository.execute(id, data);

    return {
      message: "Empresa actualizada exitosamente",
      company,
    };
  }
}
