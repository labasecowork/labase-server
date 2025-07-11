// src/modules/space/features/edit_space/presentation/services/edit_space.service.ts
import { EditSpaceDTO } from "../domain/edit_space.schema";
import { EditSpaceRepository } from "../data/edit_space.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class EditSpaceService {
  constructor(private readonly repo = new EditSpaceRepository()) {}

  async execute(id: string, dto: EditSpaceDTO) {
    const exists = await this.repo.findById(id);
    if (!exists) {
      throw new AppError("SPACE_NOT_FOUND", HttpStatusCodes.NOT_FOUND.code);
    }
    const { benefitIds, ...data } = dto;

    return this.repo.update(id, {
      ...data,                           
      spaceBenefits: benefitIds
        ? {
            deleteMany: {},
            create: benefitIds.map(bid => ({
              benefit: { connect: { id: bid } },
            })),
          }
        : undefined,
    });
  }
}
