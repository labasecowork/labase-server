// src/modules/space/features/edit_space/presentation/services/edit_space.service.ts
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
      throw new AppError(
        SPACE_MESSAGES.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code,
      );
    }

    if (exists.space_images?.length) {
      const deletions = exists.space_images.map((img) => {
        const key = new URL(img.url).pathname.slice(1);
        return deleteFile(key);
      });
      await Promise.allSettled(deletions);
    }

    const { benefitIds, ...data } = dto;

    const updateData: Parameters<EditSpaceRepository["update"]>[1] = {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.access !== undefined && { access: data.access }), // 'public' | 'private'
      ...(data.capacityMin !== undefined && { capacity_min: data.capacityMin }),
      ...(data.capacityMax !== undefined && { capacity_max: data.capacityMax }),
      ...(data.allowByUnit !== undefined && {
        allow_by_unit: data.allowByUnit,
      }),
      ...(data.allowFullRoom !== undefined && {
        allow_full_room: data.allowFullRoom,
      }),

      space_images: {
        deleteMany: {},
        ...(imageUrls.length
          ? {
              create: imageUrls.map((url, idx) => ({
                url,
                position: idx,
              })),
            }
          : {}),
      },

      ...(benefitIds !== undefined
        ? {
            space_benefits: {
              deleteMany: {},
              ...(benefitIds.length
                ? {
                    create: benefitIds.map((bid) => ({
                      benefit: { connect: { id: bid } },
                    })),
                  }
                : {}),
            },
          }
        : {}),
    };

    const updated = await this.repo.update(id, updateData);
    return updated;
  }
}
