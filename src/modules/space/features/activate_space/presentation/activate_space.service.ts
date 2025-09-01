// src/modules/space/features/activate_space/presentation/activate_space.service.ts
import { ActivateSpaceRepository } from "../data/activate_space.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class ActivateSpaceService {
  constructor(private readonly repo = new ActivateSpaceRepository()) {}

  async execute(id: string) {
    try {
      return await this.repo.update(id);
    } catch {
      throw new AppError(
        "Espacio no encontrado, por favor verifique el ID.",
        HttpStatusCodes.NOT_FOUND.code
      );
    }
  }
}
