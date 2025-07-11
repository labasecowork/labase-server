// src/modules/space/features/list_spaces/presentation/services/list_spaces.service.ts
import { ListSpacesDTO } from "../domain/list_spaces.dto";
import { ListSpacesRepository } from "../data/list_spaces.repository";

export class ListSpacesService {
  constructor(private readonly repo = new ListSpacesRepository()) {}

  async execute(dto: ListSpacesDTO) {
    return this.repo.listMany({
      where: {
        ...(dto.type && { type: dto.type }),
        ...(dto.capacity && {
          capacityMin: { lte: dto.capacity },
          capacityMax: { gte: dto.capacity },
        }),
        ...(dto.available && { disabled: false }),
      },
      orderBy: { id: "asc" },
    });
  }
}
