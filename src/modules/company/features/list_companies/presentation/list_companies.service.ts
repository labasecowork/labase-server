// src/modules/company/features/list_companies/presentation/list_companies.service.ts
import { ListCompaniesRepository } from "../data/list_companies.repository";
import {
  ListCompaniesDTO,
  ListCompaniesResponseDTO,
} from "../domain/list_companies.dto";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class ListCompaniesService {
  constructor(private readonly repository = new ListCompaniesRepository()) {}

  async execute(
    filters: ListCompaniesDTO,
    user: { id: string; role: "admin" | "client" | "employee" }
  ): Promise<ListCompaniesResponseDTO> {
    // Verificar que solo administradores puedan listar empresas
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden acceder a esta información",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    return await this.repository.execute(filters);
  }
}
