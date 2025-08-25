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
    console.log("Usuario administrador creado");

    // 2. Detalles del admin
    await prisma.admin_details.create({
      data: {
        admin_id: "22222222-2222-2222-2222-222222222222",
        role: "superadmin",
        notes: "Admin inicial del sistema",
      },
    });
    console.log("Detalles del administrador creado");

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
    console.log("Espacios creados");

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
    console.log("Precios de los espacios creados");

    // 1. Crear la empresa
    const company = await prisma.companies.create({
      data: {
        name: "La base",
        description: "Empresa de prueba para practicantes y áreas",
      },
    });

    console.log("Empresa creada:", company);

    // 2. Crear áreas de trabajo
    const workAreasData = [
      {
        name: "Administración",
        description:
          "Responsables de dar estructura y orden a la empresa, asegurando que cada área tenga lo necesario para crecer y alcanzar sus metas.",
        capacity: 10,
      },
      {
        name: "Software",
        description:
          "El corazón tecnológico de la empresa: diseñan, construyen y mejoran las herramientas que permiten que todo funcione de forma ágil y moderna.",
        capacity: 10,
      },
      {
        name: "El Arsenal",
        description:
          "El motor comercial que lleva nuestras soluciones al mercado, generando oportunidades y construyendo relaciones sólidas con clientes y aliados.",
        capacity: 10,
      },
      {
        name: "Legal",
        description:
          "Los guardianes de la seguridad jurídica: protegen a la empresa y a sus personas, garantizando decisiones seguras y sostenibles.",
        capacity: 10,
      },
      {
        name: "Marketing",
        description:
          "Encargados de dar voz y presencia a la empresa: comunican nuestro valor, inspiran confianza y acercan nuestra marca a las personas.",
        capacity: 10,
      },
      {
        name: "Contabilidad",
        description:
          "Quienes cuidan la salud financiera de la empresa: gestionan recursos con responsabilidad y aseguran que el esfuerzo de todos se transforme en crecimiento real.",
        capacity: 10,
      },
    ];

    const workAreas = await prisma.$transaction(
      workAreasData.map((wa) => prisma.work_areas.create({ data: wa }))
    );

    console.log(
      "Áreas de trabajo creadas:",
      workAreas.map((w) => w.name)
    );

    const workAreaMap = Object.fromEntries(
      workAreas.map((w) => [w.name, w.id])
    );

    const employeesData = [
      {
        name: "Susell Shecira Villazana Egoavil",
        email: "practicante8.xpertice@gmail.com",
        area: "Administración",
      },
      {
        name: "Jhon Junior Maylle Astucuri",
        email: "practicante9.xpertice@gmail.com",
        area: "Administración",
      },
      {
        name: "Jacquelin Mayde Rivera Alvarado",
        email: "practicante7.xpertice@gmail.com",
        area: "Administración",
      },
      {
        name: "Edwin Atezana Choque",
        email: "practicante4.xpertice@gmail.com",
        area: "Administración",
      },
      {
        name: "Sebastian Marcelo Oscanoa Parra",
        email: "marketing2.xpertice@gmail.com",
        area: "Administración",
      },
      {
        name: "Leonela Yustina Chalco Quintanilla",
        email: "ingenieraia6.xpertice@gmail.com",
        area: "Software",
      },
      {
        name: "Elizabeth Huarcaya Contreras",
        email: "ingenieraia8.xpertice@gmail.com",
        area: "Software",
      },
      {
        name: "Fresia Bibiana Damian Ricra",
        email: "ingenieraia7.xpertice@gmail.com",
        area: "Software",
      },
      {
        name: "Jean Pierre Chuquillanqui Montoya",
        email: "ingenieraia5.xpertice@gmail.com",
        area: "Software",
      },
      {
        name: "Yhefry Gaspar Almonacid",
        email: "practicantea5.xpertice@gmail.com",
        area: "Software",
      },
      {
        name: "Alice Mili Inga Espinoza",
        email: "abogado01.grupoaguirre@gmail.com",
        area: "Legal",
      },
      {
        name: "Karen Leslie Romero Garcia",
        email: "practicante2.xpertice@gmail.com",
        area: "Legal",
      },
      {
        name: "Alvaro Jesus Aquino Naupari",
        email: "practicantea6.xpertice@gmail.com",
        area: "Legal",
      },
      {
        name: "Jennyfer Vanesa Chuman Aguirre",
        email: "abogadocivil.grupoaguirre@gmail.com",
        area: "Legal",
      },
      {
        name: "Clara Aguirre Gonzalo",
        email: "caja.grupoaguirre@gmail.com",
        area: "Legal",
      },
      {
        name: "Rafael Aguirre Gonzalo",
        email: "manager@xpertice.pe",
        area: "Marketing",
      },
      {
        name: "Leonardo Daniel Casimiro Daga",
        email: "practicantea3.xpertice@gmail.com",
        area: "Marketing",
      },
    ];

    for (const emp of employeesData) {
      const [lastName, ...rest] = emp.name.split(" ");
      const firstName = rest.join(" ");

      await prisma.$transaction(async (tx) => {
        const user = await tx.users.create({
          data: {
            first_name: firstName,
            last_name: lastName,
            email: emp.email,

            // Then change
            password:
              "$2b$12$X00fWdC0IAfuIafie7ONleA.Uu.4JvUCe0vFaUeC66t.jeETRLNL2",
            user_type: "employee",
            status: "active",
          },
        });

        await tx.employee_details.create({
          data: {
            employee_id: user.id,
            work_area_id: workAreaMap[emp.area],
            company_id: company.id,
          },
        });

        console.log(`Empleado creado: ${firstName} ${lastName} (${emp.email})`);
      });
    }

    return { message: "Database seeded successfully" };
  }
}
