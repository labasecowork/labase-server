// src/modules/space/features/create_space/presentation/controllers/create_space.controller.ts
import { Response } from "express";
import { CreateSpaceService } from "./create_space.service";
import { CreateSpaceSchema } from "../domain/create_space.schema";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../utils/authenticated_user";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";
import { uploadFile } from "../../../../../infrastructure/aws";
import { AppError } from "../../../../../utils/errors";

export class CreateSpaceController {
  constructor(private readonly service = new CreateSpaceService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = CreateSpaceSchema.parse(JSON.parse(req.body.data));
    const files = req.files as Express.Multer.File[] | undefined;

    const imageUrls = files?.length
      ? (
          await Promise.all(files.map((f) => uploadFile(f, "public/space/img")))
        ).map((u) => u.url)
      : [];

    const authUser = await getAuthenticatedUser(req);

    if (authUser.role !== "admin") {
      throw new AppError(
        "USER_TYPE_NOT_ALLOWED",
        HttpStatusCodes.FORBIDDEN.code,
      );
    }

    const currentUser = { id: authUser.id, role: "admin" as const };

    const result = await this.service.execute(dto, currentUser, imageUrls);

    return res.status(HttpStatusCodes.CREATED.code).json(
      buildHttpResponse(
        HttpStatusCodes.CREATED.code,
        result.message,
        req.path,
        {
          space: {
            id: result.space_id,
            name: dto.name,
            description: dto.description,
            type: dto.type,
            access: dto.access,
            capacityMin: dto.capacityMin,
            capacityMax: dto.capacityMax,
            allowByUnit: dto.allowByUnit,
            allowFullRoom: dto.allowFullRoom,
            prices: dto.prices,
            benefitIds: dto.benefitIds,
            images: imageUrls,
          },
          user: authUser,
        },
      ),
    );
  }
}
