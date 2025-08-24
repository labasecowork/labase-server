// src/modules/workarea/features/list_workareas/data/list_workareas.repository.ts
import { prismaClient } from "../../../../../config/prisma_client";
import {
  ListWorkAreasDTO,
  ListWorkAreasResponseDTO,
} from "../domain/list_workareas.dto";
import { WorkAreaEntity } from "../../../entities/workarea.entity";

export class ListWorkAreasRepository {
  async execute(filters: ListWorkAreasDTO): Promise<ListWorkAreasResponseDTO> {
    const { page, limit, search, disabled } = filters;
    const skip = (page - 1) * limit;

    // Construir filtros dinámicos
    const where: any = {};

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (disabled !== undefined) {
      where.disabled = disabled;
    }

    // Obtener total para paginación
    const total = await prismaClient.workArea.count({ where });

    // Obtener áreas de trabajo con paginación
    const workareas = await prismaClient.workArea.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });

    const workAreaEntities: WorkAreaEntity[] = workareas.map((workarea) => ({
      id: workarea.id,
      name: workarea.name,
      description: workarea.description,
      capacity: workarea.capacity,
      disabled: workarea.disabled,
      created_at: workarea.created_at,
      updated_at: workarea.updated_at,
    }));

    return {
      workareas: workAreaEntities,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
