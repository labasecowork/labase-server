// src/modules/space/features/list_spaces/list_deactivated_spaces/presentation/services/list_deactivated_spaces.service.ts
import { ListDeactivatedSpacesRepository } from "../data/list_deactivated_spaces.repository";

export class ListDeactivatedSpacesService {
  constructor(private readonly repo = new ListDeactivatedSpacesRepository()) {}

  async execute() {
    return this.repo.listMany();
  }
}
