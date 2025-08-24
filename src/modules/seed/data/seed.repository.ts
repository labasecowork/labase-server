import prisma from "../../../config/prisma_client";
import { DurationUnit, PriceMode } from "@prisma/client";

export class SeedRepository {
  async seed() {
    await prisma.users.create({
      data: {
        id: "22222222-2222-2222-2222-222222222222",
        first_name: "Ana",
        last_name: "Gonzales",
        email: "admin@labase.com",
        password:
          "$2b$10$8Eky5ws3uf8FC.FuLv3WDuBJ1/q.kXs9/kk9tcNS8nj0GAmVBxsem",
        user_type: "admin",
        status: "active",
        creation_timestamp: new Date(),
      },
    });

    // 2. Detalles del admin
    await prisma.adminDetails.create({
      data: {
        admin_id: "22222222-2222-2222-2222-222222222222",
        role: "superadmin",
        notes: "Admin inicial del sistema",
      },
    });

    // 3. Espacios
    await prisma.space.createMany({
      data: [
        {
          id: "00000000-0000-0000-0000-000000000001",
          name: "La Base Operativa",
          description:
            "Espacio compartido en La Base Cowork (Huancayo) para 1–30 personas, individual o grupal.",
          type: "SHARED_SITE",
          access: "PUBLIC",
          capacityMin: 1,
          capacityMax: 30,
          allowByUnit: true,
          allowFullRoom: true,
          disabled: false,
          createdAt: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000002",
          name: "Unidad 01",
          description:
            "Espacio privado individual (Unidad 01) en La Base Cowork.",
          type: "UNIT",
          access: "PUBLIC",
          capacityMin: 1,
          capacityMax: 1,
          allowByUnit: true,
          allowFullRoom: false,
          disabled: false,
          createdAt: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000003",
          name: "Unidad 02",
          description:
            "Espacio privado individual (Unidad 02) en La Base Cowork.",
          type: "UNIT",
          access: "PUBLIC",
          capacityMin: 1,
          capacityMax: 1,
          allowByUnit: true,
          allowFullRoom: false,
          disabled: false,
          createdAt: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000004",
          name: "Unidad 03",
          description:
            "Espacio privado individual (Unidad 03) en La Base Cowork.",
          type: "UNIT",
          access: "PUBLIC",
          capacityMin: 1,
          capacityMax: 1,
          allowByUnit: true,
          allowFullRoom: false,
          disabled: false,
          createdAt: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000005",
          name: "Hangar",
          description:
            "Área compartida en La Base Cowork para 1–20 personas, individual o grupal.",
          type: "SHARED_SITE",
          access: "PUBLIC",
          capacityMin: 1,
          capacityMax: 20,
          allowByUnit: true,
          allowFullRoom: true,
          disabled: false,
          createdAt: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000006",
          name: "Reserva 01",
          description:
            "Espacio compartido en dúo para reuniones rápidas (1–2 personas) – Reserva 01.",
          type: "SHARED_SITE",
          access: "PUBLIC",
          capacityMin: 1,
          capacityMax: 2,
          allowByUnit: false,
          allowFullRoom: true,
          disabled: false,
          createdAt: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000007",
          name: "Reserva 02",
          description:
            "Espacio compartido en dúo para reuniones rápidas (1–2 personas) – Reserva 02.",
          type: "SHARED_SITE",
          access: "PUBLIC",
          capacityMin: 1,
          capacityMax: 2,
          allowByUnit: false,
          allowFullRoom: true,
          disabled: false,
          createdAt: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000008",
          name: "Bunker 01",
          description:
            "Sala privada en La Base Cowork para 2–4 personas con privacidad – Bunker 01.",
          type: "UNIT",
          access: "PRIVATE",
          capacityMin: 2,
          capacityMax: 4,
          allowByUnit: false,
          allowFullRoom: true,
          disabled: false,
          createdAt: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000009",
          name: "Bunker 02",
          description:
            "Sala privada en La Base Cowork para 2–4 personas con privacidad – Bunker 02.",
          type: "UNIT",
          access: "PRIVATE",
          capacityMin: 2,
          capacityMax: 4,
          allowByUnit: false,
          allowFullRoom: true,
          disabled: false,
          createdAt: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-00000000000a",
          name: "Brigada",
          description:
            "Espacio privado exclusivo para coworking en equipo (2–4 personas) – Brigada.",
          type: "UNIT",
          access: "PRIVATE",
          capacityMin: 2,
          capacityMax: 4,
          allowByUnit: false,
          allowFullRoom: true,
          disabled: false,
          createdAt: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-00000000000b",
          name: "Base de Mando",
          description:
            "Sala privada en La Base Cowork para reuniones estratégicas (2–10 personas).",
          type: "FULL_ROOM",
          access: "PRIVATE",
          capacityMin: 2,
          capacityMax: 10,
          allowByUnit: false,
          allowFullRoom: true,
          disabled: false,
          createdAt: new Date(),
        },
      ],
    });

    const pricesData = [
      // La Base Operativa
      {
        id: "p0000001-0000-0000-0000-000000000001",
        spaceId: "00000000-0000-0000-0000-000000000001",
        duration: "HOUR",
        mode: "INDIVIDUAL",
        amount: 20,
      },
      {
        id: "p0000001-0000-0000-0000-000000000002",
        spaceId: "00000000-0000-0000-0000-000000000001",
        duration: "DAY",
        mode: "INDIVIDUAL",
        amount: 55,
      },
      {
        id: "p0000001-0000-0000-0000-000000000003",
        spaceId: "00000000-0000-0000-0000-000000000001",
        duration: "WEEK",
        mode: "INDIVIDUAL",
        amount: 280,
      },
      {
        id: "p0000001-0000-0000-0000-000000000004",
        spaceId: "00000000-0000-0000-0000-000000000001",
        duration: "MONTH",
        mode: "INDIVIDUAL",
        amount: 400,
      },
      {
        id: "p0000001-0000-0000-0000-000000000005",
        spaceId: "00000000-0000-0000-0000-000000000001",
        duration: "HOUR",
        mode: "GROUP",
        amount: 150,
      },
      {
        id: "p0000001-0000-0000-0000-000000000006",
        spaceId: "00000000-0000-0000-0000-000000000001",
        duration: "DAY",
        mode: "GROUP",
        amount: 350,
      },
      {
        id: "p0000001-0000-0000-0000-000000000007",
        spaceId: "00000000-0000-0000-0000-000000000001",
        duration: "WEEK",
        mode: "GROUP",
        amount: 580,
      },

      // Unidad 01, 02, 03
      {
        id: "p0000002-0000-0000-0000-000000000001",
        spaceId: "00000000-0000-0000-0000-000000000002",
        duration: "HOUR",
        mode: "INDIVIDUAL",
        amount: 28,
      },
      {
        id: "p0000002-0000-0000-0000-000000000002",
        spaceId: "00000000-0000-0000-0000-000000000003",
        duration: "HOUR",
        mode: "INDIVIDUAL",
        amount: 28,
      },
      {
        id: "p0000002-0000-0000-0000-000000000003",
        spaceId: "00000000-0000-0000-0000-000000000004",
        duration: "HOUR",
        mode: "INDIVIDUAL",
        amount: 28,
      },
      {
        id: "p0000002-0000-0000-0000-000000000004",
        spaceId: "00000000-0000-0000-0000-000000000002",
        duration: "DAY",
        mode: "INDIVIDUAL",
        amount: 70,
      },
      {
        id: "p0000002-0000-0000-0000-000000000005",
        spaceId: "00000000-0000-0000-0000-000000000003",
        duration: "DAY",
        mode: "INDIVIDUAL",
        amount: 70,
      },
      {
        id: "p0000002-0000-0000-0000-000000000006",
        spaceId: "00000000-0000-0000-0000-000000000004",
        duration: "DAY",
        mode: "INDIVIDUAL",
        amount: 70,
      },
      {
        id: "p0000002-0000-0000-0000-000000000007",
        spaceId: "00000000-0000-0000-0000-000000000002",
        duration: "MONTH",
        mode: "INDIVIDUAL",
        amount: 420,
      },
      {
        id: "p0000002-0000-0000-0000-000000000008",
        spaceId: "00000000-0000-0000-0000-000000000003",
        duration: "MONTH",
        mode: "INDIVIDUAL",
        amount: 420,
      },
      {
        id: "p0000002-0000-0000-0000-000000000009",
        spaceId: "00000000-0000-0000-0000-000000000004",
        duration: "MONTH",
        mode: "INDIVIDUAL",
        amount: 420,
      },

      // Hangar
      {
        id: "p0000003-0000-0000-0000-000000000001",
        spaceId: "00000000-0000-0000-0000-000000000005",
        duration: "HOUR",
        mode: "INDIVIDUAL",
        amount: 20,
      },
      {
        id: "p0000003-0000-0000-0000-000000000002",
        spaceId: "00000000-0000-0000-0000-000000000005",
        duration: "DAY",
        mode: "INDIVIDUAL",
        amount: 55,
      },
      {
        id: "p0000003-0000-0000-0000-000000000003",
        spaceId: "00000000-0000-0000-0000-000000000005",
        duration: "WEEK",
        mode: "INDIVIDUAL",
        amount: 280,
      },
      {
        id: "p0000003-0000-0000-0000-000000000004",
        spaceId: "00000000-0000-0000-0000-000000000005",
        duration: "MONTH",
        mode: "INDIVIDUAL",
        amount: 400,
      },
      {
        id: "p0000003-0000-0000-0000-000000000005",
        spaceId: "00000000-0000-0000-0000-000000000005",
        duration: "HOUR",
        mode: "GROUP",
        amount: 105,
      },
      {
        id: "p0000003-0000-0000-0000-000000000006",
        spaceId: "00000000-0000-0000-0000-000000000005",
        duration: "DAY",
        mode: "GROUP",
        amount: 250,
      },
      {
        id: "p0000003-0000-0000-0000-000000000007",
        spaceId: "00000000-0000-0000-0000-000000000005",
        duration: "WEEK",
        mode: "GROUP",
        amount: 420,
      },

      // Reserva 01, Reserva 02
      {
        id: "p0000004-0000-0000-0000-000000000001",
        spaceId: "00000000-0000-0000-0000-000000000006",
        duration: "HOUR",
        mode: "GROUP",
        amount: 30,
      },
      {
        id: "p0000004-0000-0000-0000-000000000002",
        spaceId: "00000000-0000-0000-0000-000000000007",
        duration: "HOUR",
        mode: "GROUP",
        amount: 30,
      },
      {
        id: "p0000004-0000-0000-0000-000000000003",
        spaceId: "00000000-0000-0000-0000-000000000006",
        duration: "DAY",
        mode: "GROUP",
        amount: 65,
      },
      {
        id: "p0000004-0000-0000-0000-000000000004",
        spaceId: "00000000-0000-0000-0000-000000000007",
        duration: "DAY",
        mode: "GROUP",
        amount: 65,
      },

      // Bunker 01, Bunker 02
      {
        id: "p0000005-0000-0000-0000-000000000001",
        spaceId: "00000000-0000-0000-0000-000000000008",
        duration: "HOUR",
        mode: "GROUP",
        amount: 54,
      },
      {
        id: "p0000005-0000-0000-0000-000000000002",
        spaceId: "00000000-0000-0000-0000-000000000009",
        duration: "HOUR",
        mode: "GROUP",
        amount: 54,
      },
      {
        id: "p0000005-0000-0000-0000-000000000003",
        spaceId: "00000000-0000-0000-0000-000000000008",
        duration: "DAY",
        mode: "GROUP",
        amount: 280,
      },
      {
        id: "p0000005-0000-0000-0000-000000000004",
        spaceId: "00000000-0000-0000-0000-000000000009",
        duration: "DAY",
        mode: "GROUP",
        amount: 280,
      },
      {
        id: "p0000005-0000-0000-0000-000000000005",
        spaceId: "00000000-0000-0000-0000-000000000008",
        duration: "WEEK",
        mode: "GROUP",
        amount: 480,
      },
      {
        id: "p0000005-0000-0000-0000-000000000006",
        spaceId: "00000000-0000-0000-0000-000000000009",
        duration: "WEEK",
        mode: "GROUP",
        amount: 480,
      },

      // Brigada
      {
        id: "p0000006-0000-0000-0000-000000000001",
        spaceId: "00000000-0000-0000-0000-00000000000a",
        duration: "HOUR",
        mode: "GROUP",
        amount: 100,
      },
      {
        id: "p0000006-0000-0000-0000-000000000002",
        spaceId: "00000000-0000-0000-0000-00000000000a",
        duration: "DAY",
        mode: "GROUP",
        amount: 350,
      },
      {
        id: "p0000006-0000-0000-0000-000000000003",
        spaceId: "00000000-0000-0000-0000-00000000000a",
        duration: "MONTH",
        mode: "GROUP",
        amount: 1600,
      },

      // Base de Mando
      {
        id: "p0000007-0000-0000-0000-000000000001",
        spaceId: "00000000-0000-0000-0000-00000000000b",
        duration: "HOUR",
        mode: "GROUP",
        amount: 145,
      },
      {
        id: "p0000007-0000-0000-0000-000000000002",
        spaceId: "00000000-0000-0000-0000-00000000000b",
        duration: "DAY",
        mode: "GROUP",
        amount: 290,
      },
      {
        id: "p0000007-0000-0000-0000-000000000003",
        spaceId: "00000000-0000-0000-0000-00000000000b",
        duration: "WEEK",
        mode: "GROUP",
        amount: 490,
      },
    ];

    for (const priceData of pricesData) {
      await prisma.price.create({
        data: {
          id: priceData.id,
          spaceId: priceData.spaceId,
          duration: priceData.duration as DurationUnit,
          mode: priceData.mode as PriceMode,
          amount: priceData.amount,
        },
      });
    }

    return { message: "Database seeded successfully" };
  }
}
