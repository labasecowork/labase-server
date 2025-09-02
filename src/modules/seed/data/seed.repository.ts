import prisma from "../../../config/prisma_client";
import {
  access_type,
  article_status,
  duration_unit,
  price_mode,
  space_type,
} from "@prisma/client";
import {
  employeesData,
  pricesData,
  spacesWithImages,
  workAreasData,
  fakeClientsData,
  fakeReservationsData,
  categoriesArticles,
  articlesData,
  fakeVisitorsData,
} from "../constants";

export class SeedRepository {
  async seedProduction() {
    await this.createAdminUser();
    await this.createSpacesAndPrices();
    await this.createNewsletters();
    await this.createEmployeesWithAssignments();
    await this.createCategoriesArticles();
    await this.createArticles();
    // TODO: Crear semilla a partir del excel de visitantes

    return { message: "Database seeded successfully for production" };
  }

  async seedDevelopment() {
    await this.createAdminUser();
    await this.createClientUser();
    await this.createSpacesAndPrices();
    await this.createNewsletters();
    await this.createEmployeesWithAssignments();
    await this.createCategoriesArticles();
    await this.createArticles();
    await this.createFakeClientsAndReservations();
    await this.createFakeVisitors();

    return { message: "Database seeded successfully for development" };
  }

  async createAdminUser() {
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

    await prisma.admin_details.create({
      data: {
        admin_id: "22222222-2222-2222-2222-222222222222",
        role: "superadmin",
        notes: "Admin inicial del sistema",
      },
    });
    console.log("Detalles del administrador creado");
  }

  async createClientUser() {
    await prisma.users.create({
      data: {
        id: "33333333-3333-3333-3333-333333333333",
        first_name: "Máximo",
        last_name: "Silveria",
        email: "labase.developers@gmail.com",
        password:
          "$2b$10$8Eky5ws3uf8FC.FuLv3WDuBJ1/q.kXs9/kk9tcNS8nj0GAmVBxsem",
        user_type: "client",
        status: "active",
        creation_timestamp: new Date(),
      },
    });

    await prisma.user_details.create({
      data: {
        user_id: "33333333-3333-3333-3333-333333333333",
        status: "active",
      },
    });

    console.log("Usuario cliente creado");
  }

  async createSpacesAndPrices() {
    for (const spaceData of spacesWithImages) {
      await prisma.$transaction(async (tx) => {
        const space = await tx.space.create({
          data: {
            ...spaceData.space,
            type: spaceData.space.type as space_type,
            access: spaceData.space.access as access_type,
          },
        });

        if (spaceData.images && spaceData.images.length > 0) {
          await tx.space_image.createMany({
            data: spaceData.images.map((img) => ({
              space_id: space.id,
              url: img.url,
              alt: img.alt,
              position: img.position,
            })),
          });
        }
      });
    }
    console.log("Espacios y imagenes de los espacios creados");

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
  }

  async createNewsletters() {
    for (const emp of employeesData) {
      await prisma.newsletter_subscriber.create({
        data: {
          name: emp.name,
          email: emp.email,
          created_at: new Date(),
        },
      });
    }
    console.log("Newsletters creados");
  }

  async createEmployeesWithAssignments() {
    const company = await prisma.companies.create({
      data: {
        name: "La base",
        description: "Empresa de prueba para practicantes y áreas",
      },
    });

    console.log("Empresa creada:", company);

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

    for (const emp of employeesData) {
      const [lastName, ...rest] = emp.name.split(" ");
      const firstName = rest.join(" ");

      await prisma.$transaction(async (tx) => {
        const user = await tx.users.create({
          data: {
            first_name: firstName,
            last_name: lastName,
            email: emp.email,
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

    console.log("Empleados creados");
  }

  async createCategoriesArticles() {
    for (const category of categoriesArticles) {
      await prisma.article_categories.create({
        data: {
          id: category.id,
          name: category.name,
          description: category.description,
        },
      });
    }
    console.log("Categorías de artículos creadas");
  }

  async createArticles() {
    for (const article of articlesData) {
      await prisma.articles.create({
        data: {
          ...article,
          status: article.status as article_status,
        },
      });
    }
    console.log("Artículos creados");
  }

  async createFakeClientsAndReservations() {
    // Crear clientes falsos
    for (const clientData of fakeClientsData) {
      await prisma.users.create({
        data: {
          ...clientData,
          user_type: clientData.user_type as "client",
          status: clientData.status as "active",
          gender: clientData.gender as "male" | "female" | "unspecified",
          creation_timestamp: new Date(),
        },
      });

      await prisma.user_details.create({
        data: {
          user_id: clientData.id,
          status: clientData.status as "active",
        },
      });
    }
    console.log("Clientes falsos creados");

    // Crear reservas falsas
    for (const reservationData of fakeReservationsData) {
      await prisma.reservation.create({
        data: {
          ...reservationData,
          status: reservationData.status as "confirmed",
          created_at: new Date(),
        },
      });
    }
    console.log("Reservas falsas creadas");
  }

  async createFakeVisitors() {
    for (const visitorData of fakeVisitorsData) {
      await prisma.visitors.create({
        data: {
          dni: visitorData.dni || null,
          ruc: visitorData.ruc || null,
          first_name: visitorData.first_name,
          last_name: visitorData.last_name,
          phone: visitorData.phone,
          email: visitorData.email,
          user_id: visitorData.user_id,
          space_id: visitorData.space_id,
          entry_time: visitorData.entry_time,
          exit_time: visitorData.exit_time,
          created_at: new Date(),
        },
      });
    }
    console.log("Visitantes falsos creados");
  }
}
