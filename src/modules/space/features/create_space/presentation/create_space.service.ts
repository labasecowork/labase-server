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

  async execute(dto: CreateSpaceDTO, user: CurrentUser) {
    if (user.role !== "admin")
      throw new AppError(
        SPACE_MESSAGES.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code
      );

    const created = await this.repo.create({
      name: dto.name,
      description: dto.description,
      type: dto.type,
      access: dto.access,
      capacityMin: dto.capacityMin,
      capacityMax: dto.capacityMax,
      allowByUnit: dto.allowByUnit,
      allowFullRoom: dto.allowFullRoom,

      prices: {
        create: dto.prices.map((p) => ({ duration: p.unit, amount: p.value })),
      },
      spaceBenefits: dto.benefitIds?.length
        ? {
            create: dto.benefitIds.map((id) => ({
              benefit: { connect: { id } },
            })),
          }
        : undefined,
    });

    return { message: SPACE_MESSAGES.CREATED_SUCCESS, space_id: created.id };
  }
}
