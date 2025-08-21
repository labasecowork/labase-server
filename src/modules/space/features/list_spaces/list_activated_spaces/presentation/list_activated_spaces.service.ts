// src/modules/space/features/list_spaces/list_activated_spaces/presentation/services/list_activated_spaces.service.ts
import { ListActivatedSpacesDTO } from "../domain/list_activated_spaces.dto";
import { ListActivatedSpacesRepository } from "../data/list_activated_spaces.repository";

export class ListActivatedSpacesService {
  constructor(private readonly repo = new ListActivatedSpacesRepository()) {}

  async execute(dto: ListActivatedSpacesDTO) {
    return this.repo.listMany({
      where: {
        ...(dto.type && { type: dto.type }),
        ...(dto.capacity && {
          capacityMin: { lte: dto.capacity },
          capacityMax: { gte: dto.capacity },
        }),
        // Activados por defecto; si available es true, reforzamos disabled: false
        ...(dto.available && { disabled: false }),
      },
      orderBy: { id: "asc" },
    });
  }
}
