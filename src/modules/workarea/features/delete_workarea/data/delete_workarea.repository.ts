// src/modules/workarea/features/delete_workarea/data/delete_workarea.repository.ts
import { prismaClient } from "../../../../../config/prisma_client";
import { WorkAreaEntity } from "../../../entities/workarea.entity";

export class DeleteWorkAreaRepository {
  async execute(id: string): Promise<void> {
    await prismaClient.workArea.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<WorkAreaEntity | null> {
    const workarea = await prismaClient.workArea.findUnique({
      where: { id },
    });

    if (!workarea) return null;

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

  async hasEmployees(id: string): Promise<boolean> {
    const employeeCount = await prismaClient.employeeDetails.count({
      where: {
        work_area_id: id,
      },
    });

    return employeeCount > 0;
  }
}
