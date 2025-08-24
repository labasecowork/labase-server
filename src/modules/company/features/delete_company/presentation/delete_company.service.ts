// src/modules/company/features/delete_company/presentation/delete_company.service.ts
import { DeleteCompanyRepository } from "../data/delete_company.repository";
import { DeleteCompanyResponseDTO } from "../domain/delete_company.dto";
import { throwError } from "../../../../../utils/errors";

export class DeleteCompanyService {
  constructor(private readonly repository = new DeleteCompanyRepository()) {}

  async execute(
    id: string,
    user: { id: string; role: "admin" | "client" | "employee" }
  ): Promise<DeleteCompanyResponseDTO> {
    // Verificar que solo administradores puedan eliminar empresas
    if (user.role !== "admin") {
      throwError(
        "FORBIDDEN",
        "Solo los administradores pueden eliminar empresas"
      );
    }

    // Verificar que la empresa existe
    const existingCompany = await this.repository.findById(id);
    if (!existingCompany) {
      throwError("NOT_FOUND", "Empresa no encontrada");
    }

    // Verificar que no tenga empleados asignados
    const hasEmployees = await this.repository.hasEmployees(id);
    if (hasEmployees) {
      throwError(
        "CONFLICT",
        "No se puede eliminar la empresa porque tiene empleados asignados"
      );
    }

    // Eliminar la empresa
    await this.repository.execute(id);

    return {
      message: "Empresa eliminada exitosamente",
    };
  }
}
