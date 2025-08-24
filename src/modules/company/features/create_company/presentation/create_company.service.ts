// src/modules/company/features/create_company/presentation/create_company.service.ts
import { CreateCompanyRepository } from "../data/create_company.repository";
import {
  CreateCompanyDTO,
  CreateCompanyResponseDTO,
} from "../domain/create_company.dto";
import { throwError } from "../../../../../utils/errors";

export class CreateCompanyService {
  constructor(private readonly repository = new CreateCompanyRepository()) {}

  async execute(
    data: CreateCompanyDTO,
    user: { id: string; role: "admin" | "client" | "employee" }
  ): Promise<CreateCompanyResponseDTO> {
    // Verificar que solo administradores puedan crear empresas
    if (user.role !== "admin") {
      throwError("FORBIDDEN", "Solo los administradores pueden crear empresas");
    }

    // Verificar si ya existe una empresa con el mismo nombre
    const nameExists = await this.repository.checkIfNameExists(data.name);
    if (nameExists) {
      throwError("CONFLICT", "Ya existe una empresa con este nombre");
    }

    // Crear la empresa
    const company = await this.repository.execute(data);

    return {
      message: "Empresa creada exitosamente",
      company,
    };
  }
}
