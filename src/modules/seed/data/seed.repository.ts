import prisma from "../../../config/prisma_client";
import { duration_unit, price_mode } from "@prisma/client";

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
    await prisma.admin_details.create({
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
          type: "shared_site",
          access: "public",
          capacity_min: 1,
          capacity_max: 30,
          allow_by_unit: true,
          allow_full_room: true,
          disabled: false,
          created_at: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000002",
          name: "Unidad 01",
          description:
            "Espacio privado individual (Unidad 01) en La Base Cowork.",
          type: "unit",
          access: "public",
          capacity_min: 1,
          capacity_max: 1,
          allow_by_unit: true,
          allow_full_room: false,
          disabled: false,
          created_at: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000003",
          name: "Unidad 02",
          description:
            "Espacio privado individual (Unidad 02) en La Base Cowork.",
          type: "unit",
          access: "public",
          capacity_min: 1,
          capacity_max: 1,
          allow_by_unit: true,
          allow_full_room: false,
          disabled: false,
          created_at: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000004",
          name: "Unidad 03",
          description:
            "Espacio privado individual (Unidad 03) en La Base Cowork.",
          type: "unit",
          access: "public",
          capacity_min: 1,
          capacity_max: 1,
          allow_by_unit: true,
          allow_full_room: false,
          disabled: false,
          created_at: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000005",
          name: "Hangar",
          description:
            "Área compartida en La Base Cowork para 1–20 personas, individual o grupal.",
          type: "shared_site",
          access: "public",
          capacity_min: 1,
          capacity_max: 20,
          allow_by_unit: true,
          allow_full_room: false,
          disabled: false,
          created_at: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000006",
          name: "Reserva 01",
          description:
            "Espacio compartido en dúo para reuniones rápidas (1–2 personas) – Reserva 01.",
          type: "shared_site",
          access: "public",
          capacity_min: 1,
          capacity_max: 2,
          allow_by_unit: true,
          allow_full_room: false,
          disabled: false,
          created_at: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000007",
          name: "Reserva 02",
          description:
            "Espacio compartido en dúo para reuniones rápidas (1–2 personas) – Reserva 02.",
          type: "shared_site",
          access: "public",
          capacity_min: 1,
          capacity_max: 2,
          allow_by_unit: true,
          allow_full_room: false,
          disabled: false,
          created_at: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000008",
          name: "Bunker 01",
          description:
            "Sala privada en La Base Cowork para 2–4 personas con privacidad – Bunker 01.",
          type: "unit",
          access: "private",
          capacity_min: 2,
          capacity_max: 4,
          allow_by_unit: false,
          allow_full_room: true,
          disabled: false,
          created_at: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-000000000009",
          name: "Bunker 02",
          description:
            "Sala privada en La Base Cowork para 2–4 personas con privacidad – Bunker 02.",
          type: "unit",
          access: "private",
          capacity_min: 2,
          capacity_max: 4,
          allow_by_unit: false,
          allow_full_room: true,
          disabled: false,
          created_at: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-00000000000a",
          name: "Brigada",
          description:
            "Espacio privado exclusivo para coworking en equipo (2–4 personas) – Brigada.",
          type: "unit",
          access: "private",
          capacity_min: 2,
          capacity_max: 4,
          allow_by_unit: false,
          allow_full_room: true,
          disabled: false,
          created_at: new Date(),
        },
        {
          id: "00000000-0000-0000-0000-00000000000b",
          name: "Base de Mando",
          description:
            "Sala privada en La Base Cowork para reuniones estratégicas (2–10 personas).",
          type: "full_room",
          access: "private",
          capacity_min: 2,
          capacity_max: 10,
          allow_by_unit: false,
          allow_full_room: true,
          disabled: false,
          created_at: new Date(),
        },
      ],
    });

    const pricesData = [
      // La Base Operativa
      {
        id: "p0000001-0000-0000-0000-000000000001",
        space_id: "00000000-0000-0000-0000-000000000001",
        duration: "hour",
        mode: "individual",
        amount: 20,
      },
      {
        id: "p0000001-0000-0000-0000-000000000002",
        space_id: "00000000-0000-0000-0000-000000000001",
        duration: "day",
        mode: "individual",
        amount: 55,
      },
      {
        id: "p0000001-0000-0000-0000-000000000003",
        space_id: "00000000-0000-0000-0000-000000000001",
        duration: "week",
        mode: "individual",
        amount: 280,
      },
      {
        id: "p0000001-0000-0000-0000-000000000004",
        space_id: "00000000-0000-0000-0000-000000000001",
        duration: "month",
        mode: "individual",
        amount: 400,
      },
      {
        id: "p0000001-0000-0000-0000-000000000005",
        space_id: "00000000-0000-0000-0000-000000000001",
        duration: "hour",
        mode: "group",
        amount: 150,
      },
      {
        id: "p0000001-0000-0000-0000-000000000006",
        space_id: "00000000-0000-0000-0000-000000000001",
        duration: "day",
        mode: "group",
        amount: 350,
      },
      {
        id: "p0000001-0000-0000-0000-000000000007",
        space_id: "00000000-0000-0000-0000-000000000001",
        duration: "week",
        mode: "group",
        amount: 580,
      },

      // Unidad 01, 02, 03
      {
        id: "p0000002-0000-0000-0000-000000000001",
        space_id: "00000000-0000-0000-0000-000000000002",
        duration: "hour",
        mode: "individual",
        amount: 28,
      },
      {
        id: "p0000002-0000-0000-0000-000000000002",
        space_id: "00000000-0000-0000-0000-000000000003",
        duration: "hour",
        mode: "individual",
        amount: 28,
      },
      {
        id: "p0000002-0000-0000-0000-000000000003",
        space_id: "00000000-0000-0000-0000-000000000004",
        duration: "hour",
        mode: "individual",
        amount: 28,
      },
      {
        id: "p0000002-0000-0000-0000-000000000004",
        space_id: "00000000-0000-0000-0000-000000000002",
        duration: "day",
        mode: "individual",
        amount: 70,
      },
      {
        id: "p0000002-0000-0000-0000-000000000005",
        space_id: "00000000-0000-0000-0000-000000000003",
        duration: "day",
        mode: "individual",
        amount: 70,
      },
      {
        id: "p0000002-0000-0000-0000-000000000006",
        space_id: "00000000-0000-0000-0000-000000000004",
        duration: "day",
        mode: "individual",
        amount: 70,
      },
      {
        id: "p0000002-0000-0000-0000-000000000007",
        space_id: "00000000-0000-0000-0000-000000000002",
        duration: "month",
        mode: "individual",
        amount: 420,
      },
      {
        id: "p0000002-0000-0000-0000-000000000008",
        space_id: "00000000-0000-0000-0000-000000000003",
        duration: "month",
        mode: "individual",
        amount: 420,
      },
      {
        id: "p0000002-0000-0000-0000-000000000009",
        space_id: "00000000-0000-0000-0000-000000000004",
        duration: "month",
        mode: "individual",
        amount: 420,
      },

      // Hangar
      {
        id: "p0000003-0000-0000-0000-000000000001",
        space_id: "00000000-0000-0000-0000-000000000005",
        duration: "hour",
        mode: "individual",
        amount: 20,
      },
      {
        id: "p0000003-0000-0000-0000-000000000002",
        space_id: "00000000-0000-0000-0000-000000000005",
        duration: "day",
        mode: "individual",
        amount: 55,
      },
      {
        id: "p0000003-0000-0000-0000-000000000003",
        space_id: "00000000-0000-0000-0000-000000000005",
        duration: "week",
        mode: "individual",
        amount: 280,
      },
      {
        id: "p0000003-0000-0000-0000-000000000004",
        space_id: "00000000-0000-0000-0000-000000000005",
        duration: "month",
        mode: "individual",
        amount: 400,
      },
      {
        id: "p0000003-0000-0000-0000-000000000005",
        space_id: "00000000-0000-0000-0000-000000000005",
        duration: "hour",
        mode: "group",
        amount: 105,
      },
      {
        id: "p0000003-0000-0000-0000-000000000006",
        space_id: "00000000-0000-0000-0000-000000000005",
        duration: "day",
        mode: "group",
        amount: 250,
      },
      {
        id: "p0000003-0000-0000-0000-000000000007",
        space_id: "00000000-0000-0000-0000-000000000005",
        duration: "week",
        mode: "group",
        amount: 420,
      },

      // Reserva 01, Reserva 02
      {
        id: "p0000004-0000-0000-0000-000000000001",
        space_id: "00000000-0000-0000-0000-000000000006",
        duration: "hour",
        mode: "group",
        amount: 30,
      },
      {
        id: "p0000004-0000-0000-0000-000000000002",
        space_id: "00000000-0000-0000-0000-000000000007",
        duration: "hour",
        mode: "group",
        amount: 30,
      },
      {
        id: "p0000004-0000-0000-0000-000000000003",
        space_id: "00000000-0000-0000-0000-000000000006",
        duration: "day",
        mode: "group",
        amount: 65,
      },
      {
        id: "p0000004-0000-0000-0000-000000000004",
        space_id: "00000000-0000-0000-0000-000000000007",
        duration: "day",
        mode: "group",
        amount: 65,
      },

      // Bunker 01, Bunker 02
      {
        id: "p0000005-0000-0000-0000-000000000001",
        space_id: "00000000-0000-0000-0000-000000000008",
        duration: "hour",
        mode: "group",
        amount: 54,
      },
      {
        id: "p0000005-0000-0000-0000-000000000002",
        space_id: "00000000-0000-0000-0000-000000000009",
        duration: "hour",
        mode: "group",
        amount: 54,
      },
      {
        id: "p0000005-0000-0000-0000-000000000003",
        space_id: "00000000-0000-0000-0000-000000000008",
        duration: "day",
        mode: "group",
        amount: 280,
      },
      {
        id: "p0000005-0000-0000-0000-000000000004",
        space_id: "00000000-0000-0000-0000-000000000009",
        duration: "day",
        mode: "group",
        amount: 280,
      },
      {
        id: "p0000005-0000-0000-0000-000000000005",
        space_id: "00000000-0000-0000-0000-000000000008",
        duration: "week",
        mode: "group",
        amount: 480,
      },
      {
        id: "p0000005-0000-0000-0000-000000000006",
        space_id: "00000000-0000-0000-0000-000000000009",
        duration: "week",
        mode: "group",
        amount: 480,
      },
      // Brigada
      {
        id: "p0000006-0000-0000-0000-000000000001",
        space_id: "00000000-0000-0000-0000-00000000000a",
        duration: "hour",
        mode: "group",
        amount: 100,
      },
      {
        id: "p0000006-0000-0000-0000-000000000002",
        space_id: "00000000-0000-0000-0000-00000000000a",
        duration: "day",
        mode: "group",
        amount: 350,
      },
      {
        id: "p0000006-0000-0000-0000-000000000003",
        space_id: "00000000-0000-0000-0000-00000000000a",
        duration: "month",
        mode: "group",
        amount: 1600,
      },

      // Base de Mando
      {
        id: "p0000007-0000-0000-0000-000000000001",
        space_id: "00000000-0000-0000-0000-00000000000b",
        duration: "hour",
        mode: "group",
        amount: 145,
      },
      {
        id: "p0000007-0000-0000-0000-000000000002",
        space_id: "00000000-0000-0000-0000-00000000000b",
        duration: "day",
        mode: "group",
        amount: 290,
      },
      {
        id: "p0000007-0000-0000-0000-000000000003",
        space_id: "00000000-0000-0000-0000-00000000000b",
        duration: "week",
        mode: "group",
        amount: 490,
      },
    ];

    for (const priceData of pricesData) {
      await prisma.price.create({
        data: {
          id: priceData.id,
          space_id: priceData.space_id,
          duration: priceData.duration as duration_unit,
          mode: priceData.mode as price_mode,
          amount: priceData.amount,
        },
      });
    }

    return { message: "Database seeded successfully" };
  }
} // 👈 esta llave faltaba
