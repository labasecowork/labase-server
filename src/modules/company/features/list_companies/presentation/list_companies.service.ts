// src/modules/company/features/list_companies/presentation/list_companies.service.ts
import { ListCompaniesRepository } from "../data/list_companies.repository";
import {
  ListCompaniesDTO,
  ListCompaniesResponseDTO,
} from "../domain/list_companies.dto";
import { throwError } from "../../../../../utils/errors";

export class ListCompaniesService {
  constructor(private readonly repository = new ListCompaniesRepository()) {}

  async execute(
    filters: ListCompaniesDTO,
    user: { id: string; role: "admin" | "client" | "employee" }
  ): Promise<ListCompaniesResponseDTO> {
    // Verificar que solo administradores puedan listar empresas
    if (user.role !== "admin") {
      throwError(
        "FORBIDDEN",
        "Solo los administradores pueden acceder a esta información"
      );
    }

    return await this.repository.execute(filters);
  }
}
