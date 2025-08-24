// src/modules/space/features/create_space/presentation/services/create_space.service.ts
import { CreateSpaceDTO } from "../domain/create_space.dto";
import { CreateSpaceRepository } from "../data/create_space.repository";
import { AppError } from "../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { SPACE_MESSAGES } from "../../../../../constants/messages/space";

interface CurrentUser {
  id: string;
  role: "client" | "admin";
  admin_role?: "superadmin" | "manager";
}

export class CreateSpaceService {
  constructor(private readonly repo = new CreateSpaceRepository()) {}

  async execute(dto: CreateSpaceDTO, user: CurrentUser, imageUrls: string[]) {
    if (user.role !== "admin") {
      throw new AppError(
        SPACE_MESSAGES.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code,
      );
    }

    const created = await this.repo.create({
      name: dto.name,
      description: dto.description,
      type: dto.type,
      access: dto.access,
      capacity_min: dto.capacityMin,
      capacity_max: dto.capacityMax,
      allow_by_unit: dto.allowByUnit,
      allow_full_room: dto.allowFullRoom,
      disabled: false,

      space_images: imageUrls.length
        ? {
            create: imageUrls.map((url, idx) => ({
              url,
              position: idx,
            })),
          }
        : undefined,

      prices: {
        create: dto.prices.map((p) => ({
          duration: p.unit,
          mode: p.mode,
          amount: p.value,
        })),
      },

      space_benefits: dto.benefitIds?.length
        ? {
            create: dto.benefitIds.map((id) => ({
              benefit: { connect: { id } },
            })),
          }
        : undefined,
    });

    return {
      message: SPACE_MESSAGES.CREATED_SUCCESS,
      space_id: created.id,
    };
  }
}
