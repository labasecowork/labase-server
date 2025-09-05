export const workAreasData = [
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

export const employeesData = [
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

export const spacesWithImages = [
  {
    space: {
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
    images: [
      {
        url: "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/space/img/boperativa.webp",
        alt: "Imagen de la Base de Mando",
        position: 0,
      },
    ],
  },
  {
    space: {
      id: "00000000-0000-0000-0000-000000000002",
      name: "Unidad 01",
      description: "Espacio privado individual (Unidad 01) en La Base Cowork.",
      type: "unit",
      access: "public",
      capacity_min: 1,
      capacity_max: 1,
      allow_by_unit: true,
      allow_full_room: false,
      disabled: false,
      created_at: new Date(),
    },
    images: [
      {
        url: "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/space/img/unidades.webp",
        alt: "Imagen de la Base de Mando",
        position: 0,
      },
    ],
  },
  {
    space: {
      id: "00000000-0000-0000-0000-000000000003",
      name: "Unidad 02",
      description: "Espacio privado individual (Unidad 02) en La Base Cowork.",
      type: "unit",
      access: "public",
      capacity_min: 1,
      capacity_max: 1,
      allow_by_unit: true,
      allow_full_room: false,
      disabled: false,
      created_at: new Date(),
    },
    images: [
      {
        url: "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/space/img/unidades.webp",
        alt: "Imagen de la Base de Mando",
        position: 0,
      },
    ],
  },
  {
    space: {
      id: "00000000-0000-0000-0000-000000000004",
      name: "Unidad 03",
      description: "Espacio privado individual (Unidad 03) en La Base Cowork.",
      type: "unit",
      access: "public",
      capacity_min: 1,
      capacity_max: 1,
      allow_by_unit: true,
      allow_full_room: false,
      disabled: false,
      created_at: new Date(),
    },
    images: [
      {
        url: "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/space/img/unidades.webp",
        alt: "Imagen de la Base de Mando",
        position: 0,
      },
    ],
  },
  {
    space: {
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
    images: [
      {
        url: "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/space/img/hangar.webp",
        alt: "Imagen del Hangar",
        position: 0,
      },
    ],
  },
  {
    space: {
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
    images: [
      {
        url: "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/space/img/reserbas.webp",
        alt: "Imagen de la Base de Mando",
        position: 0,
      },
    ],
  },
  {
    space: {
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
    images: [
      {
        url: "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/space/img/reserbas.webp",
        alt: "Imagen de la Base de Mando",
        position: 0,
      },
    ],
  },
  {
    space: {
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
    images: [
      {
        url: "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/space/img/bunker.webp",
        alt: "Imagen de la Base de Mando",
        position: 0,
      },
    ],
  },
  {
    space: {
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
    images: [
      {
        url: "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/space/img/bunker.webp",
        alt: "Imagen de la Base de Mando",
        position: 0,
      },
    ],
  },
  {
    space: {
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
    images: [
      {
        url: "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/space/img/brigada.webp",
        alt: "Imagen de la Base de Mando",
        position: 0,
      },
    ],
  },
  {
    space: {
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
    images: [
      {
        url: "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/space/img/bmando.webp",
        alt: "Imagen de la Base de Mando",
        position: 0,
      },
    ],
  },
];

export const pricesData = [
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

export const fakeClientsData = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    first_name: "María",
    last_name: "García",
    email: "maria.garcia@email.com",
    password: "$2b$10$8Eky5ws3uf8FC.FuLv3WDuBJ1/q.kXs9/kk9tcNS8nj0GAmVBxsem",
    user_type: "client",
    status: "active",
    profile_image: null,
    phone: "999888777",
    birth_date: new Date("1990-05-15"),
    gender: "female",
  },
  {
    id: "22222222-1111-1111-1111-111111111111",
    first_name: "Carlos",
    last_name: "Rodríguez",
    email: "carlos.rodriguez@email.com",
    password: "$2b$10$8Eky5ws3uf8FC.FuLv3WDuBJ1/q.kXs9/kk9tcNS8nj0GAmVBxsem",
    user_type: "client",
    status: "active",
    profile_image: null,
    phone: "999888776",
    birth_date: new Date("1985-08-22"),
    gender: "male",
  },
  {
    id: "33333333-1111-1111-1111-111111111111",
    first_name: "Ana",
    last_name: "López",
    email: "ana.lopez@email.com",
    password: "$2b$10$8Eky5ws3uf8FC.FuLv3WDuBJ1/q.kXs9/kk9tcNS8nj0GAmVBxsem",
    user_type: "client",
    status: "active",
    profile_image: null,
    phone: "999888775",
    birth_date: new Date("1992-03-10"),
    gender: "female",
  },
  {
    id: "44444444-1111-1111-1111-111111111111",
    first_name: "Luis",
    last_name: "Martínez",
    email: "luis.martinez@email.com",
    password: "$2b$10$8Eky5ws3uf8FC.FuLv3WDuBJ1/q.kXs9/kk9tcNS8nj0GAmVBxsem",
    user_type: "client",
    status: "active",
    profile_image: null,
    phone: "999888774",
    birth_date: new Date("1988-12-05"),
    gender: "male",
  },
  {
    id: "55555555-1111-1111-1111-111111111111",
    first_name: "Sofia",
    last_name: "Hernández",
    email: "sofia.hernandez@email.com",
    password: "$2b$10$8Eky5ws3uf8FC.FuLv3WDuBJ1/q.kXs9/kk9tcNS8nj0GAmVBxsem",
    user_type: "client",
    status: "active",
    profile_image: null,
    phone: "999888773",
    birth_date: new Date("1995-07-18"),
    gender: "female",
  },
  {
    id: "66666666-1111-1111-1111-111111111111",
    first_name: "Diego",
    last_name: "González",
    email: "diego.gonzalez@email.com",
    password: "$2b$10$8Eky5ws3uf8FC.FuLv3WDuBJ1/q.kXs9/kk9tcNS8nj0GAmVBxsem",
    user_type: "client",
    status: "active",
    profile_image: null,
    phone: "999888772",
    birth_date: new Date("1987-11-30"),
    gender: "male",
  },
  {
    id: "77777777-1111-1111-1111-111111111111",
    first_name: "Valentina",
    last_name: "Pérez",
    email: "valentina.perez@email.com",
    password: "$2b$10$8Eky5ws3uf8FC.FuLv3WDuBJ1/q.kXs9/kk9tcNS8nj0GAmVBxsem",
    user_type: "client",
    status: "active",
    profile_image: null,
    phone: "999888771",
    birth_date: new Date("1993-04-25"),
    gender: "female",
  },
  {
    id: "88888888-1111-1111-1111-111111111111",
    first_name: "Roberto",
    last_name: "Sánchez",
    email: "roberto.sanchez@email.com",
    password: "$2b$10$8Eky5ws3uf8FC.FuLv3WDuBJ1/q.kXs9/kk9tcNS8nj0GAmVBxsem",
    user_type: "client",
    status: "active",
    profile_image: null,
    phone: "999888770",
    birth_date: new Date("1986-09-14"),
    gender: "male",
  },
  {
    id: "99999999-1111-1111-1111-111111111111",
    first_name: "Carmen",
    last_name: "Torres",
    email: "carmen.torres@email.com",
    password: "$2b$10$8Eky5ws3uf8FC.FuLv3WDuBJ1/q.kXs9/kk9tcNS8nj0GAmVBxsem",
    user_type: "client",
    status: "active",
    profile_image: null,
    phone: "999888769",
    birth_date: new Date("1991-01-20"),
    gender: "female",
  },
  {
    id: "aaaaaaaa-1111-1111-1111-111111111111",
    first_name: "Fernando",
    last_name: "Ramírez",
    email: "fernando.ramirez@email.com",
    password: "$2b$10$8Eky5ws3uf8FC.FuLv3WDuBJ1/q.kXs9/kk9tcNS8nj0GAmVBxsem",
    user_type: "client",
    status: "active",
    profile_image: null,
    phone: "999888768",
    birth_date: new Date("1989-06-12"),
    gender: "male",
  },
];

export const fakeVisitorsData = [
  {
    dni: "12345678",
    first_name: "Juan",
    last_name: "Pérez",
    phone: "987654321",
    email: "juan.perez@email.com",
    user_id: "11111111-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000001",
    entry_time: new Date("2024-01-15T09:00:00"),
    exit_time: new Date("2024-01-15T17:00:00"),
  },
  {
    dni: "23456789",
    first_name: "Elena",
    last_name: "Morales",
    phone: "987654322",
    email: "elena.morales@email.com",
    user_id: "22222222-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000002",
    entry_time: new Date("2024-01-16T10:30:00"),
    exit_time: new Date("2024-01-16T15:45:00"),
  },
  {
    dni: "34567890",
    first_name: "Miguel",
    last_name: "Vargas",
    phone: "987654323",
    email: "miguel.vargas@email.com",
    user_id: "33333333-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000003",
    entry_time: new Date("2024-01-17T08:15:00"),
    exit_time: new Date("2024-01-17T16:30:00"),
  },
  {
    dni: "45678901",
    first_name: "Patricia",
    last_name: "Silva",
    phone: "987654324",
    email: "patricia.silva@email.com",
    user_id: "44444444-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000004",
    entry_time: new Date("2024-01-18T11:00:00"),
    exit_time: new Date("2024-01-18T18:20:00"),
  },
  {
    dni: "56789012",
    first_name: "Ricardo",
    last_name: "Mendoza",
    phone: "987654325",
    email: "ricardo.mendoza@email.com",
    user_id: "55555555-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000005",
    entry_time: new Date("2024-01-19T09:45:00"),
    exit_time: new Date("2024-01-19T14:15:00"),
  },
  {
    dni: "67890123",
    first_name: "Claudia",
    last_name: "Rojas",
    phone: "987654326",
    email: "claudia.rojas@email.com",
    user_id: "66666666-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000006",
    entry_time: new Date("2024-01-20T13:30:00"),
    exit_time: new Date("2024-01-20T19:00:00"),
  },
  {
    dni: "78901234",
    first_name: "Andrés",
    last_name: "Castro",
    phone: "987654327",
    email: "andres.castro@email.com",
    user_id: "77777777-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000007",
    entry_time: new Date("2024-01-21T07:30:00"),
    exit_time: new Date("2024-01-21T12:45:00"),
  },
  {
    dni: "89012345",
    first_name: "Gabriela",
    last_name: "Herrera",
    phone: "987654328",
    email: "gabriela.herrera@email.com",
    user_id: "88888888-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000008",
    entry_time: new Date("2024-01-22T10:00:00"),
    exit_time: new Date("2024-01-22T16:30:00"),
  },
  {
    dni: "90123456",
    first_name: "Javier",
    last_name: "Vega",
    phone: "987654329",
    email: "javier.vega@email.com",
    user_id: "99999999-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000009",
    entry_time: new Date("2024-01-23T12:15:00"),
    exit_time: new Date("2024-01-23T17:45:00"),
  },
  {
    dni: "01234567",
    first_name: "Natalia",
    last_name: "Flores",
    phone: "987654330",
    email: "natalia.flores@email.com",
    user_id: "aaaaaaaa-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-00000000000a",
    entry_time: new Date("2024-01-24T08:45:00"),
    exit_time: new Date("2024-01-24T15:30:00"),
  },
  {
    ruc: "20123456789",
    first_name: "Empresa",
    last_name: "Consulting SAC",
    phone: "987654331",
    email: "contacto@consulting.com",
    user_id: "11111111-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-00000000000b",
    entry_time: new Date("2024-01-25T09:30:00"),
    exit_time: new Date("2024-01-25T18:00:00"),
  },
  {
    dni: "13579246",
    first_name: "Alberto",
    last_name: "Jiménez",
    phone: "987654332",
    email: "alberto.jimenez@email.com",
    user_id: "22222222-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000001",
    entry_time: new Date("2024-01-26T11:15:00"),
    exit_time: new Date("2024-01-26T16:00:00"),
  },
  {
    dni: "24681357",
    first_name: "Lucía",
    last_name: "Paredes",
    phone: "987654333",
    email: "lucia.paredes@email.com",
    user_id: "33333333-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000002",
    entry_time: new Date("2024-01-27T14:20:00"),
    exit_time: new Date("2024-01-27T19:30:00"),
  },
  {
    dni: "35792468",
    first_name: "Raúl",
    last_name: "Delgado",
    phone: "987654334",
    email: "raul.delgado@email.com",
    user_id: "44444444-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000003",
    entry_time: new Date("2024-01-28T07:45:00"),
    exit_time: new Date("2024-01-28T13:15:00"),
  },
  {
    dni: "46813579",
    first_name: "Mónica",
    last_name: "Guerrero",
    phone: "987654335",
    email: "monica.guerrero@email.com",
    user_id: "55555555-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000004",
    entry_time: new Date("2024-01-29T10:30:00"),
    exit_time: new Date("2024-01-29T17:00:00"),
  },
  {
    dni: "57924680",
    first_name: "Sergio",
    last_name: "Aguilar",
    phone: "987654336",
    email: "sergio.aguilar@email.com",
    user_id: "66666666-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000005",
    entry_time: new Date("2024-01-30T12:00:00"),
    exit_time: new Date("2024-01-30T18:45:00"),
  },
  {
    dni: "68035791",
    first_name: "Verónica",
    last_name: "Campos",
    phone: "987654337",
    email: "veronica.campos@email.com",
    user_id: "77777777-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000006",
    entry_time: new Date("2024-01-31T08:30:00"),
    exit_time: new Date("2024-01-31T14:45:00"),
  },
  {
    dni: "79146802",
    first_name: "Óscar",
    last_name: "Ruiz",
    phone: "987654338",
    email: "oscar.ruiz@email.com",
    user_id: "88888888-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000007",
    entry_time: new Date("2024-02-01T15:15:00"),
    exit_time: new Date("2024-02-01T20:30:00"),
  },
  {
    ruc: "20987654321",
    first_name: "Innovación",
    last_name: "Digital EIRL",
    phone: "987654339",
    email: "info@innovacion.com",
    user_id: "99999999-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000008",
    entry_time: new Date("2024-02-02T09:00:00"),
    exit_time: new Date("2024-02-02T16:15:00"),
  },
  {
    dni: "91357024",
    first_name: "Cristina",
    last_name: "Salazar",
    phone: "987654340",
    email: "cristina.salazar@email.com",
    user_id: "aaaaaaaa-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000009",
    entry_time: new Date("2024-02-03T11:45:00"),
    exit_time: new Date("2024-02-03T17:20:00"),
  },
];

export function generateWeekDates() {
  const today = new Date();
  const dates: Date[] = [];

  // 3 días anteriores
  for (let i = 3; i > 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date);
  }

  // Día actual
  dates.push(today);

  // 3 días siguientes
  for (let i = 1; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  return dates;
}

export function generateWorkHours() {
  const hours: number[] = [];
  for (let hour = 8; hour <= 18; hour++) {
    hours.push(hour);
  }
  return hours;
}

export const fakeReservationsData = [
  // Reserva 1 - La Base Operativa - Individual
  {
    id: "res-0001-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-001",
    user_id: "11111111-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000001",
    start_time: new Date("2025-01-20T09:00:00Z"),
    end_time: new Date("2025-01-20T11:00:00Z"),
    people: 1,
    full_room: false,
    code_qr: "QR-001-2025-001",
    price: 40,
    status: "confirmed",
  },
  // Reserva 2 - Unidad 01 - Individual
  {
    id: "res-0002-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-002",
    user_id: "22222222-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000002",
    start_time: new Date("2025-01-20T14:00:00Z"),
    end_time: new Date("2025-01-20T16:00:00Z"),
    people: 1,
    full_room: false,
    code_qr: "QR-002-2025-001",
    price: 56,
    status: "confirmed",
  },
  // Reserva 3 - Hangar - Individual
  {
    id: "res-0003-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-003",
    user_id: "33333333-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000005",
    start_time: new Date("2025-01-20T10:00:00Z"),
    end_time: new Date("2025-01-20T12:00:00Z"),
    people: 1,
    full_room: false,
    code_qr: "QR-003-2025-001",
    price: 40,
    status: "confirmed",
  },
  // Reserva 4 - Reserva 01 - Grupal
  {
    id: "res-0004-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-004",
    user_id: "44444444-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000006",
    start_time: new Date("2025-01-20T15:00:00Z"),
    end_time: new Date("2025-01-20T17:00:00Z"),
    people: 2,
    full_room: true,
    code_qr: "QR-004-2025-001",
    price: 60,
    status: "confirmed",
  },
  // Reserva 5 - Bunker 01 - Grupal
  {
    id: "res-0005-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-005",
    user_id: "55555555-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000008",
    start_time: new Date("2025-01-21T08:00:00Z"),
    end_time: new Date("2025-01-21T10:00:00Z"),
    people: 3,
    full_room: true,
    code_qr: "QR-005-2025-001",
    price: 108,
    status: "confirmed",
  },
  // Reserva 6 - Base de Mando - Grupal
  {
    id: "res-0006-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-006",
    user_id: "66666666-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-00000000000b",
    start_time: new Date("2025-01-21T13:00:00Z"),
    end_time: new Date("2025-01-21T15:00:00Z"),
    people: 5,
    full_room: true,
    code_qr: "QR-006-2025-001",
    price: 290,
    status: "confirmed",
  },
  // Reserva 7 - La Base Operativa - Grupal
  {
    id: "res-0007-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-007",
    user_id: "77777777-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000001",
    start_time: new Date("2025-01-21T16:00:00Z"),
    end_time: new Date("2025-01-21T18:00:00Z"),
    people: 8,
    full_room: true,
    code_qr: "QR-007-2025-001",
    price: 300,
    status: "confirmed",
  },
  // Reserva 8 - Unidad 02 - Individual
  {
    id: "res-0008-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-008",
    user_id: "88888888-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000003",
    start_time: new Date("2025-01-22T09:00:00Z"),
    end_time: new Date("2025-01-22T11:00:00Z"),
    people: 1,
    full_room: false,
    code_qr: "QR-008-2025-001",
    price: 56,
    status: "confirmed",
  },
  // Reserva 9 - Brigada - Grupal
  {
    id: "res-0009-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-009",
    user_id: "99999999-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-00000000000a",
    start_time: new Date("2025-01-22T14:00:00Z"),
    end_time: new Date("2025-01-22T16:00:00Z"),
    people: 4,
    full_room: true,
    code_qr: "QR-009-2025-001",
    price: 200,
    status: "confirmed",
  },
  // Reserva 10 - Hangar - Individual
  {
    id: "res-0010-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-010",
    user_id: "aaaaaaaa-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000005",
    start_time: new Date("2025-01-22T17:00:00Z"),
    end_time: new Date("2025-01-22T18:00:00Z"),
    people: 1,
    full_room: false,
    code_qr: "QR-010-2025-001",
    price: 20,
    status: "confirmed",
  },
  // Reserva 11 - Reserva 02 - Grupal
  {
    id: "res-0011-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-011",
    user_id: "11111111-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000007",
    start_time: new Date("2025-01-23T10:00:00Z"),
    end_time: new Date("2025-01-23T12:00:00Z"),
    people: 2,
    full_room: true,
    code_qr: "QR-011-2025-001",
    price: 60,
    status: "confirmed",
  },
  // Reserva 12 - Bunker 02 - Grupal
  {
    id: "res-0012-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-012",
    user_id: "22222222-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000009",
    start_time: new Date("2025-01-23T15:00:00Z"),
    end_time: new Date("2025-01-23T17:00:00Z"),
    people: 3,
    full_room: true,
    code_qr: "QR-012-2025-001",
    price: 108,
    status: "confirmed",
  },
  // Reserva 13 - La Base Operativa - Individual
  {
    id: "res-0013-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-013",
    user_id: "33333333-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000001",
    start_time: new Date("2025-01-24T08:00:00Z"),
    end_time: new Date("2025-01-24T10:00:00Z"),
    people: 1,
    full_room: false,
    code_qr: "QR-013-2025-001",
    price: 40,
    status: "confirmed",
  },
  // Reserva 14 - Unidad 03 - Individual
  {
    id: "res-0014-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-014",
    user_id: "44444444-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000004",
    start_time: new Date("2025-01-24T13:00:00Z"),
    end_time: new Date("2025-01-24T15:00:00Z"),
    people: 1,
    full_room: false,
    code_qr: "QR-014-2025-001",
    price: 56,
    status: "confirmed",
  },
  // Reserva 15 - Base de Mando - Grupal
  {
    id: "res-0015-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-015",
    user_id: "55555555-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-00000000000b",
    start_time: new Date("2025-01-24T16:00:00Z"),
    end_time: new Date("2025-01-24T18:00:00Z"),
    people: 6,
    full_room: true,
    code_qr: "QR-015-2025-001",
    price: 290,
    status: "confirmed",
  },
  // Reserva 16 - Hangar - Individual
  {
    id: "res-0016-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-016",
    user_id: "66666666-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000005",
    start_time: new Date("2025-01-25T09:00:00Z"),
    end_time: new Date("2025-01-25T11:00:00Z"),
    people: 1,
    full_room: false,
    code_qr: "QR-016-2025-001",
    price: 40,
    status: "confirmed",
  },
  // Reserva 17 - Brigada - Grupal
  {
    id: "res-0017-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-017",
    user_id: "77777777-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-00000000000a",
    start_time: new Date("2025-01-25T14:00:00Z"),
    end_time: new Date("2025-01-25T16:00:00Z"),
    people: 4,
    full_room: true,
    code_qr: "QR-017-2025-001",
    price: 200,
    status: "confirmed",
  },
  // Reserva 18 - Reserva 01 - Grupal
  {
    id: "res-0018-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-018",
    user_id: "88888888-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000006",
    start_time: new Date("2025-01-26T10:00:00Z"),
    end_time: new Date("2025-01-26T12:00:00Z"),
    people: 2,
    full_room: true,
    code_qr: "QR-018-2025-001",
    price: 60,
    status: "confirmed",
  },
  // Reserva 19 - Unidad 01 - Individual
  {
    id: "res-0019-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-019",
    user_id: "99999999-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000002",
    start_time: new Date("2025-01-26T15:00:00Z"),
    end_time: new Date("2025-01-26T17:00:00Z"),
    people: 1,
    full_room: false,
    code_qr: "QR-019-2025-001",
    price: 56,
    status: "confirmed",
  },
  // Reserva 20 - La Base Operativa - Grupal
  {
    id: "res-0020-0000-0000-0000-000000000001",
    purchase_number: "COMP-2025-020",
    user_id: "aaaaaaaa-1111-1111-1111-111111111111",
    space_id: "00000000-0000-0000-0000-000000000001",
    start_time: new Date("2025-01-26T17:00:00Z"),
    end_time: new Date("2025-01-26T18:00:00Z"),
    people: 12,
    full_room: true,
    code_qr: "QR-020-2025-001",
    price: 150,
    status: "confirmed",
  },
];

export const categoriesArticles = [
  {
    id: "cat-0001-0000-0000-0000-000000000001",
    name: "Coworking",
    description:
      "Descubre cómo se vive la experiencia en nuestro espacio: networking, eventos inspiradores y las historias que hacen de nuestra comunidad el corazón del coworking en Huancayo.",
  },
  {
    id: "cat-0002-0000-0000-0000-000000000001",
    name: "Negocios",
    description:
      "Consejos, casos de éxito y tendencias que impulsan a emprendedores y startups. Todo lo que necesitas para crecer y hacer despegar tu proyecto.",
  },
  {
    id: "cat-0003-0000-0000-0000-000000000001",
    name: "Lifestyle",
    description:
      "El lado humano del trabajo remoto: balance, bienestar y las mejores recomendaciones para disfrutar de Huancayo mientras trabajas a tu ritmo.",
  },
  {
    id: "cat-0004-0000-0000-0000-000000000001",
    name: "Tecnología",
    description:
      "Herramientas digitales, innovación y estrategias para ser más productivo desde cualquier lugar. El futuro del trabajo está aquí, y es remoto.",
  },
  {
    id: "cat-0005-0000-0000-0000-000000000001",
    name: "Recursos",
    description:
      "Información práctica y actualizada sobre Huancayo: dónde alojarte, comer, moverte y conectar. Todo lo que un nómada digital necesita en un solo lugar.",
  },
];

export const articlesData = [
  {
    title:
      "Huancayo: El Sorprendente Despertar del Ecosistema de Startups en la Sierra Central",
    author_id: "22222222-2222-2222-2222-222222222222",
    category_id: "cat-0002-0000-0000-0000-000000000001",
    content:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/content/articulo1.html",
    banner:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/banner/articulo1.jpg",
    resume:
      "Huancayo emerge como polo de innovación en la sierra central, atrayendo startups y talento digital con bajo costo de vida, conectividad y enfoque en AgriTech y logística. Compite con Lima ofreciendo calidad de vida y oportunidades para retornados y emprendedores.",
    reading_time: 10,
    status: "accepted",
  },
  {
    title:
      "El futuro del trabajo remoto en la sierra central: tendencias globales aplicadas a Huancayo",
    author_id: "22222222-2222-2222-2222-222222222222",
    category_id: "cat-0001-0000-0000-0000-000000000001",
    content:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/content/articulo2.html",
    banner:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/banner/articulo2.jpg",
    resume:
      "Huancayo se perfila como referente del teletrabajo en la sierra central, combinando talento local, bajo costo de vida y conectividad. Con coworking, nómadas digitales y flexibilidad laboral, enfrenta retos de infraestructura, pero ofrece grandes oportunidades de desarrollo.",
    reading_time: 12,
    status: "accepted",
  },
  {
    title:
      "Historias de éxito locales: Emprendedores de Huancayo en espacios de coworking",
    author_id: "22222222-2222-2222-2222-222222222222",
    category_id: "cat-0002-0000-0000-0000-000000000001",
    content:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/content/articulo3.html",
    banner:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/banner/articulo3.jpg",
    resume:
      "En Huancayo, el coworking impulsa a startups y emprendedores locales con infraestructura, networking y mentoría. Casos como Andes Software, Café Andino y EcoMinka muestran cómo la colaboración permite internacionalizar, innovar y hacer crecer la economía regional.",
    reading_time: 8,
    status: "accepted",
  },
  {
    title:
      "Consejos Prácticos para Aprovechar un Cowork: Cómo Hacer Contactos de Valor sin Parecer Vendedor Pesado",
    author_id: "22222222-2222-2222-2222-222222222222",
    category_id: "cat-0001-0000-0000-0000-000000000001",
    content:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/content/articulo4.html",
    banner:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/banner/articulo4.jpg",
    resume:
      "En un coworking, el networking eficaz se basa en conectar, no en vender. Sé visible sin invadir, conversa con curiosidad genuina, ofrece ayuda desinteresada y construye confianza. La clave: dar valor primero; las oportunidades llegarán de forma natural.",
    reading_time: 7,
    status: "accepted",
  },
  {
    title:
      "El Renacimiento Digital y Creativo de Huancayo: Una Fusión de Talento y Oportunidades",
    author_id: "22222222-2222-2222-2222-222222222222",
    category_id: "cat-0004-0000-0000-0000-000000000001",
    content:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/content/articulo5.html",
    banner:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/banner/articulo5.jpg",
    resume:
      "Huancayo vive un renacimiento digital y creativo: startups, programadores, diseñadores y artistas unen talento para innovar desde los Andes. Con identidad cultural, bajo costo y colaboración comunitaria, construyen un ecosistema tech prometedor pese a retos de capital.",
    reading_time: 10,
    status: "accepted",
  },
  {
    title:
      "Work-life balance en altura: Ventajas de vivir y trabajar en Huancayo frente a Lima",
    author_id: "22222222-2222-2222-2222-222222222222",
    category_id: "cat-0003-0000-0000-0000-000000000001",
    content:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/content/articulo6.html",
    banner:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/banner/articulo6.jpg",
    resume:
      "Huancayo ofrece mejor equilibrio vida-trabajo frente a Lima: menor costo de vida, menos traslados, naturaleza cercana y cultura viva que reducen estrés y aumentan productividad. Ideal para profesionales remotos, emprendedores y familias que buscan bienestar.",
    reading_time: 10,
    status: "accepted",
  },
  {
    title:
      "Eventos y talleres en un cowork: ¡Impulsa tu crecimiento profesional y networking!",
    author_id: "22222222-2222-2222-2222-222222222222",
    category_id: "cat-0001-0000-0000-0000-000000000001",
    content:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/content/articulo7.html",
    banner:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/banner/articulo7.jpg",
    resume:
      "Los coworkings son más que oficinas: sus eventos y talleres impulsan networking, aprendizaje e innovación. Desde charlas y bootcamps hasta afterworks, conectan profesionales, fomentan creatividad y abren oportunidades para crecer y destacar.",
    reading_time: 12,
    status: "accepted",
  },
  {
    title:
      "Coworking sostenible en los Andes: Cómo integrar energías limpias, reciclaje, comunidad y respeto cultural",
    author_id: "22222222-2222-2222-2222-222222222222",
    category_id: "cat-0005-0000-0000-0000-000000000001",
    content:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/content/articulo8.html",
    banner:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/banner/articulo8.jpg",
    resume:
      "El coworking sostenible en los Andes integra energías limpias, reciclaje, comunidad y respeto cultural. Fusiona modernidad y tradición andina, reduce impacto ambiental, fortalece identidad local y ofrece a profesionales un espacio innovador con propósito.",
    reading_time: 10,
    status: "accepted",
  },
  {
    title:
      "El Auge de los Espacios de Trabajo Compartidos: Un Desafío para la Concentración",
    author_id: "22222222-2222-2222-2222-222222222222",
    category_id: "cat-0001-0000-0000-0000-000000000001",
    content:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/content/articulo9.html",
    banner:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/banner/articulo9.jpg",
    resume:
      "El coworking sostenible en los Andes combina energías limpias, reciclaje, comunidad y respeto cultural. Impulsa la economía local, preserva tradiciones, reduce huella ambiental y ofrece a profesionales un modelo de trabajo innovador con identidad andina.",
    reading_time: 8,
    status: "accepted",
  },
  {
    title:
      "Guía del nómada digital en Huancayo: dónde alojarse, comer, moverse y conectar con la comunidad local",
    author_id: "22222222-2222-2222-2222-222222222222",
    category_id: "cat-0005-0000-0000-0000-000000000001",
    content:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/content/articulo10.html",
    banner:
      "https://labase-aws-test.s3.us-east-2.amazonaws.com/public/articles/banner/articulo10.jpg",
    resume:
      "Huancayo, en la sierra central del Perú, es un destino ideal para nómadas digitales: ofrece internet estable, bajo costo de vida, alojamiento variado, gastronomía andina, transporte accesible y una comunidad cultural vibrante que equilibra trabajo y vida.",
    reading_time: 10,
    status: "accepted",
  },
];

export const brandList = [
  { name: "Dell" },
  { name: "HP" },
  { name: "Logitech" },
  { name: "Canon" },
  { name: "Samsung" },
  { name: "Apple" },
  { name: "Microsoft" },
  { name: "Epson" },
];

export const productList = [
  {
    name: 'Monitor Dell 24" Full HD',
    photo_url: "https://placehold.co/500x500",
    brand_name: "Dell",
    unit_of_measure: "unit",
    description: "Monitor LED de 24 pulgadas con resolución Full HD 1920x1080",
    observations: "Ideal para workstations de coworking",
    quantity: 15,
  },
  {
    name: "Laptop HP Pavilion 15",
    photo_url: "https://placehold.co/500x500",
    brand_name: "HP",
    unit_of_measure: "unit",
    description:
      "Laptop para uso general con procesador Intel i5, 8GB RAM, 256GB SSD",
    observations: "Disponible para alquiler por horas",
    quantity: 8,
  },
  {
    name: "Mouse Inalámbrico Logitech MX Master",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Logitech",
    unit_of_measure: "unit",
    description: "Mouse ergonómico inalámbrico con precisión avanzada",
    observations: "Batería de larga duración",
    quantity: 25,
  },
  {
    name: "Teclado Mecánico Logitech G Pro",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Logitech",
    unit_of_measure: "unit",
    description: "Teclado mecánico compacto para gaming y productividad",
    observations: "Switches mecánicos táctiles",
    quantity: 20,
  },
  {
    name: "Impresora Canon PIXMA TS3350",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Canon",
    unit_of_measure: "unit",
    description: "Impresora multifuncional inalámbrica para documentos y fotos",
    observations: "Conectividad WiFi y USB",
    quantity: 3,
  },
  {
    name: "Webcam Logitech C920",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Logitech",
    unit_of_measure: "unit",
    description: "Cámara web HD 1080p con micrófono integrado",
    observations: "Ideal para videoconferencias",
    quantity: 12,
  },
  {
    name: "Tablet Samsung Galaxy Tab A8",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Samsung",
    unit_of_measure: "unit",
    description: 'Tablet de 10.5" con Android, 4GB RAM, 64GB almacenamiento',
    observations: "Perfecta para presentaciones móviles",
    quantity: 6,
  },
  {
    name: "Cable HDMI 2m",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Samsung",
    unit_of_measure: "meter",
    description: "Cable HDMI de alta velocidad 2.0 de 2 metros",
    observations: "Compatible con 4K",
    quantity: 30,
  },
  {
    name: "Audífonos Apple AirPods Pro",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Apple",
    unit_of_measure: "unit",
    description: "Audífonos inalámbricos con cancelación activa de ruido",
    observations: "Estuche de carga incluido",
    quantity: 10,
  },
  {
    name: "Proyector Epson EB-X41",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Epson",
    unit_of_measure: "unit",
    description: "Proyector XGA 3600 lúmenes para presentaciones",
    observations: "Ideal para salas de reuniones",
    quantity: 4,
  },
  {
    name: "Superficie Microsoft Surface Pro",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Microsoft",
    unit_of_measure: "unit",
    description: "Tablet híbrida 2-en-1 con Windows 11 Pro",
    observations: "Incluye teclado desmontable",
    quantity: 5,
  },
  {
    name: "Router WiFi HP OfficeConnect",
    photo_url: "https://placehold.co/500x500",
    brand_name: "HP",
    unit_of_measure: "unit",
    description: "Router empresarial con WiFi 6 y gestión cloud",
    observations: "Hasta 100 usuarios simultáneos",
    quantity: 2,
  },
  {
    name: "Disco Duro Externo Samsung T7",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Samsung",
    unit_of_measure: "unit",
    description: "SSD externo portátil de 1TB con USB-C",
    observations: "Velocidades de hasta 1050 MB/s",
    quantity: 8,
  },
  {
    name: "Soporte Monitor Dell Dual",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Dell",
    unit_of_measure: "unit",
    description: 'Soporte ajustable para dos monitores hasta 27"',
    observations: "Montaje en escritorio con abrazadera",
    quantity: 7,
  },
  {
    name: "Pizarra Interactiva Samsung Flip",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Samsung",
    unit_of_measure: "unit",
    description: 'Pantalla táctil de 55" para colaboración digital',
    observations: "Conectividad inalámbrica y USB",
    quantity: 2,
  },
  {
    name: "Cargador USB-C Universal",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Apple",
    unit_of_measure: "unit",
    description: "Cargador de 65W con puerto USB-C Power Delivery",
    observations: "Compatible con laptops y tablets",
    quantity: 20,
  },
  {
    name: "Hub USB Logitech 7-en-1",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Logitech",
    unit_of_measure: "unit",
    description: "Hub con múltiples puertos USB, HDMI y lector SD",
    observations: "Diseño compacto y portátil",
    quantity: 15,
  },
  {
    name: "Lámpara LED Escritorio",
    photo_url: "https://placehold.co/500x500",
    brand_name: "HP",
    unit_of_measure: "unit",
    description: "Lámpara LED ajustable con carga inalámbrica integrada",
    observations: "Control táctil de intensidad",
    quantity: 18,
  },
  {
    name: "Papel Bond A4",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Canon",
    unit_of_measure: "kilogram",
    description: "Papel bond blanco A4 de 75g/m² para impresión",
    observations: "Paquete de 500 hojas",
    quantity: 50,
  },
  {
    name: "Organizador Cables",
    photo_url: "https://placehold.co/500x500",
    brand_name: "Microsoft",
    unit_of_measure: "piece",
    description: "Set de organizadores adhesivos para gestión de cables",
    observations: "Incluye 10 piezas de diferentes tamaños",
    quantity: 25,
  },
];
