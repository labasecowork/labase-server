// src/modules/product/features/edit_product/presentation/edit_product.service.ts
import { EditProductDTO } from "../domain/edit_product.dto";
import { EditProductRepository } from "../data/edit_product.repository";
import { AppError } from "../../../../../../utils/errors";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { MESSAGES } from "../../../../../../constants/messages";
import { deleteFile } from "../../../../../../infrastructure/aws";
import type { CurrentUser } from "../../../../../../utils/authenticated_user";
import prisma from "../../../../../../config/prisma_client";

export class EditProductService {
  constructor(private readonly repo = new EditProductRepository()) {}

  async execute(
    id: string,
    dto: EditProductDTO,
    user: Pick<CurrentUser, "id" | "role">,
    newImageUrl: string
  ) {
    if (user.role !== "admin") {
      throw new AppError(
        MESSAGES.PRODUCT.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new AppError(
        MESSAGES.PRODUCT.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    // Validar brand_id solo si se envía
    if (dto.brand_id) {
      const brand = await prisma.product_brand.findUnique({
        where: { id: dto.brand_id },
      });
      if (!brand) {
        throw new AppError(
          MESSAGES.BRAND.NOT_FOUND,
          HttpStatusCodes.BAD_REQUEST.code
        );
      }
    }

    // Manejar la imagen
    let photo_url = existing.photo_url;
    if (newImageUrl) {
      // Si hay nueva imagen, eliminar la anterior si existe
      if (existing.photo_url) {
        const key = new URL(existing.photo_url).pathname.slice(1);
        await deleteFile(key);
      }
      photo_url = newImageUrl;
    }

    // Construir el objeto de actualización solo con los campos enviados
    const updateData: any = {};

    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.unit_of_measure !== undefined)
      updateData.unit_of_measure = dto.unit_of_measure;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.observations !== undefined)
      updateData.observations = dto.observations;
    if (dto.quantity !== undefined) updateData.quantity = dto.quantity;
    if (newImageUrl) updateData.photo_url = photo_url;
    if (dto.brand_id) updateData.brand = { connect: { id: dto.brand_id } };

    const updated = await this.repo.update(id, updateData);

    return updated;
  }
}
