// src/modules/space/features/deactivate_space/presentation/deactivate_space.service.ts
import { DeactivateSpaceRepository } from "../data/deactivate_space.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class DeactivateSpaceService {
  constructor(private readonly repo = new DeactivateSpaceRepository()) {}

  async execute(id: string) {
    try {
      return await this.repo.update(id);
    } catch {
      throw new AppError("SPACE_NOT_FOUND", HttpStatusCodes.NOT_FOUND.code);
    }
  }
}
