// src/modules/workarea/features/create_workarea/data/create_workarea.repository.ts
import { prismaClient } from "../../../../../config/prisma_client";
import { CreateWorkAreaDTO } from "../domain/create_workarea.dto";
import { WorkAreaEntity } from "../../../entities/workarea.entity";

export class CreateWorkAreaRepository {
  async execute(data: CreateWorkAreaDTO): Promise<WorkAreaEntity> {
    const workarea = await prismaClient.workArea.create({
      data: {
        name: data.name,
        description: data.description || null,
        capacity: data.capacity,
        disabled: false,
      },
    });

    return {
      id: workarea.id,
      name: workarea.name,
      description: workarea.description,
      capacity: workarea.capacity,
      disabled: workarea.disabled,
      created_at: workarea.created_at,
      updated_at: workarea.updated_at,
    };
  }

  async checkIfNameExists(name: string): Promise<boolean> {
    const existingWorkArea = await prismaClient.workArea.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    return !!existingWorkArea;
  }
}
