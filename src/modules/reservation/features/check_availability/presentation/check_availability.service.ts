// src/modules/reservation/features/check_availability/presentation/check_availability.service.ts
import { CheckAvailabilityDTO } from "../domain/check_availability.dto";
import { CheckAvailabilityRepository } from "../data/check_availability.repository";

export class CheckAvailabilityService {
  constructor(private readonly repo = new CheckAvailabilityRepository()) {}

  async execute(dto: CheckAvailabilityDTO) {
    const overlap = await this.repo.findOverlaps(
      dto.space_id,
      dto.start_time,
      dto.end_time
    );
    return { available: !overlap };
  }
}
