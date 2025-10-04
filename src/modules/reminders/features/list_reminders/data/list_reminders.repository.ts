import prisma from "../../../../../config/prisma_client";
import { Reminder } from "../../../entities/reminder.entity";

export class ListRemindersRepository {
  async findAll(params: {
    page: number;
    limit: number;
    search?: string;
    isActive?: boolean;
  }): Promise<{ reminders: Reminder[]; total: number }> {
    const offset = (params.page - 1) * params.limit;

    const where = {
      ...(params.isActive !== undefined && { is_active: params.isActive }),
      ...(params.search && {
        OR: [
          { name: { contains: params.search, mode: "insensitive" as const } },
          {
            message: { contains: params.search, mode: "insensitive" as const },
          },
          {
            phone_number: {
              contains: params.search,
              mode: "insensitive" as const,
            },
          },
        ],
      }),
    };

    const [reminders, total] = await Promise.all([
      prisma.reminders.findMany({
        where,
        skip: offset,
        take: params.limit,
        orderBy: { created_at: "desc" },
      }),
      prisma.reminders.count({ where }),
    ]);

    return {
      reminders: reminders.map((reminder) => ({
        id: reminder.id,
        name: reminder.name,
        phoneNumber: reminder.phone_number,
        message: reminder.message,
        sendDate: reminder.send_date,
        frequency: reminder.frequency,
        isActive: reminder.is_active,
        createdAt: reminder.created_at,
        updatedAt: reminder.updated_at,
      })),
      total,
    };
  }
}
