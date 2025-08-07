import { EditSpaceDTO } from "../domain/edit_space.schema";
import { EditSpaceRepository } from "../data/edit_space.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { deleteFile } from "../../../../../infrastructure/aws";
import { SPACE_MESSAGES } from "../../../../../constants/messages/space";

export class EditSpaceService {
  constructor(private readonly repo = new EditSpaceRepository()) {}

  async execute(id: string, dto: EditSpaceDTO, imageUrls: string[]) {
    const exists = await this.repo.findById(id);
    if (!exists) {
      throw new AppError(SPACE_MESSAGES.NOT_FOUND, HttpStatusCodes.NOT_FOUND.code);
    }

    if (exists.images?.length) {
      for (const url of exists.images) {
        const key = new URL(url).pathname.slice(1);
        await deleteFile(key);
      }
    }

    const { benefitIds, ...data } = dto;

    return this.repo.update(id, {
      ...data,
      images: imageUrls.length ? imageUrls : [],
      spaceBenefits: benefitIds
        ? {
            deleteMany: {},
            create: benefitIds.map((bid) => ({
              benefit: { connect: { id: bid } },
            })),
          }
        : undefined,
    });
  }
}
