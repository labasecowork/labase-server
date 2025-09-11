import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.3",
  info: {
    title: "LaBase API",
    version: "1.0.0",
    description:
      "API services for the LaBase platform. This documentation provides detailed information about all available endpoints, their parameters, and expected responses.",
    contact: {
      name: "LaBase Development Team",
      email: "developers@labase.io",
      url: "https://labase.io/contact",
    },
    license: {
      name: "Proprietary - LaBase",
      url: "https://labase.io/terms",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
    {
      url: "https://api-staging.labase.io",
      description: "Staging server",
    },
    {
      url: "https://api.labase.io",
      description: "Production server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          "Provide your authentication JWT token prefixed with 'Bearer '",
      },
    },
    schemas: {
      // Enums
      UserType: {
        type: "string",
        enum: ["admin", "client", "employee"],
        description: "Tipo de usuario en el sistema",
        example: "client",
      },
      AdminRole: {
        type: "string",
        enum: ["superadmin", "manager"],
        description:
          "Rol del administrador - superadmin: permisos totales (crea otros superadmins y managers), manager: permisos limitados (solo puede crear managers)",
        example: "manager",
      },
      UserStatus: {
        type: "string",
        enum: ["active", "suspended", "pending"],
        description:
          "Estado del usuario - active: usuario activo, suspended: usuario suspendido, pending: usuario pendiente de verificación o activación",
        example: "active",
      },
      NotificationType: {
        type: "string",
        enum: ["info", "success", "error", "alert"],
        description:
          "Tipo de notificación - info: notificación informativa, success: operación exitosa, error: error en la operación, alert: alerta importante",
        example: "info",
      },
      SpaceType: {
        type: "string",
        enum: ["unit", "shared_site", "full_room"],
        description:
          "Tipo de espacio - unit: unidad individual (privada), shared_site: sitio individual en espacio compartido, full_room: reserva de todo el espacio (sala completa)",
        example: "unit",
      },
      AccessType: {
        type: "string",
        enum: ["public", "private"],
        description:
          "Tipo de acceso - public: visible y reservable por cualquier cliente, private: reservable solo por admin o bajo condiciones especiales",
        example: "public",
      },
      DurationUnit: {
        type: "string",
        enum: ["hour", "day", "week", "month"],
        description: "Unidad de duración para precios y reservas",
        example: "hour",
      },
      PriceMode: {
        type: "string",
        enum: ["individual", "group"],
        description:
          "Modo de precio - individual: precio por sitio/unidad, group: precio por reserva de sala completa",
        example: "individual",
      },
      ReservationStatus: {
        type: "string",
        enum: ["pending", "confirmed", "cancelled", "in_progress"],
        description:
          "Estado de reserva - pending: estado inicial al crear una reserva (aún no se ha pagado), confirmed: estado asignado cuando el pago fue APROBADO por el proveedor (Niubiz), cancelled: estado cuando un admin o cliente cancela manualmente la reserva o vence el tiempo de espera sin pagar, in_progress: estado al momento de escanear el código QR de una reserva CONFIRMADA y dentro del horario",
        example: "pending",
      },
      PaymentStatus: {
        type: "string",
        enum: ["pending", "ready", "approved", "canceled", "failed"],
        description:
          "Estado de pago - pending: estado inicial al crear el flujo de pago (aún sin generar sessionToken), ready: estado cuando se ha generado correctamente el sessionToken y script de pago (checkout.js), approved: estado final cuando el proveedor aprueba el pago del cliente, canceled: pago cancelado manualmente por el usuario (desde frontend o backend), failed: el proveedor rechazó el pago (tarjeta inválida, error interno, etc.)",
        example: "pending",
      },
      ArticleStatus: {
        type: "string",
        enum: ["pending", "accepted", "rejected"],
        description: "Estado del artículo",
        example: "pending",
      },
      CommunityUserType: {
        type: "string",
        enum: ["moderator", "member"],
        description:
          "Tipo de usuario de comunidad - member: miembro de la comunidad",
        example: "member",
      },
      ReactionType: {
        type: "string",
        enum: ["like", "dislike"],
        description: "Tipo de reacción - dislike: no me gusta",
        example: "like",
      },
      ReactionTarget: {
        type: "string",
        enum: ["publication", "comment", "reply"],
        description:
          "Objetivo de la reacción - publication: reacción a una publicación, comment: reacción a un comentario, reply: reacción a una respuesta",
        example: "publication",
      },
      AttendanceType: {
        type: "string",
        enum: ["entry", "exit"],
        description: "Tipo de asistencia - entry: entrada, exit: salida",
        example: "entry",
      },
      UnitOfMeasure: {
        type: "string",
        enum: ["unit", "kilogram", "meter", "piece"],
        description:
          "Unidad de medida - unit: unidad, kilogram: kilogramo, meter: metro, piece: pieza",
        example: "unit",
      },
      CompanyType: {
        type: "string",
        enum: ["internal", "tenant"],
        description:
          "Tipo de empresa - internal: La Base, tenant: empresa inquilina",
        example: "tenant",
      },
      Gender: {
        type: "string",
        enum: ["male", "female", "unspecified"],
        description:
          "Género - male: hombre, female: mujer, unspecified: sin especificar",
        example: "unspecified",
      },

      // Models
      User: {
        type: "object",
        description: "Usuario del sistema",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único del usuario",
          },
          first_name: {
            type: "string",
            description: "Nombre del usuario",
          },
          last_name: {
            type: "string",
            description: "Apellido del usuario",
          },
          email: {
            type: "string",
            format: "email",
            description: "Correo electrónico único",
          },
          password: {
            type: "string",
            description: "Contraseña hasheada",
          },
          user_type: {
            $ref: "#/components/schemas/UserType",
            description: "Tipo de usuario (admin, client o employee)",
          },
          profile_image: {
            type: "string",
            nullable: true,
            description: "URL de imagen de perfil del usuario",
          },
          phone: {
            type: "string",
            nullable: true,
            description: "Número telefónico del usuario",
          },
          birth_date: {
            type: "string",
            format: "date",
            nullable: true,
            description: "Fecha de nacimiento",
          },
          gender: {
            $ref: "#/components/schemas/Gender",
            description: "Género del usuario",
          },
          status: {
            $ref: "#/components/schemas/UserStatus",
            description: "Estado actual del usuario",
          },
          creation_timestamp: {
            type: "string",
            format: "date-time",
            description: "Fecha de creación del registro",
          },
        },
        required: [
          "id",
          "first_name",
          "last_name",
          "email",
          "password",
          "gender",
          "status",
          "creation_timestamp",
        ],
      },

      AdminDetails: {
        type: "object",
        description: "Detalles específicos para usuarios administradores",
        properties: {
          admin_id: {
            type: "string",
            format: "uuid",
            description: "ID del admin (igual al ID en users.id)",
          },
          role: {
            $ref: "#/components/schemas/AdminRole",
            description: "Rol del administrador",
          },
          notes: {
            type: "string",
            nullable: true,
            description: "Notas administrativas adicionales",
          },
        },
        required: ["admin_id", "role"],
      },

      UserDetails: {
        type: "object",
        description: "Detalles generales del usuario",
        properties: {
          user_id: {
            type: "string",
            format: "uuid",
            description: "ID del usuario",
          },
          status: {
            $ref: "#/components/schemas/UserStatus",
            description: "Estado del usuario (duplicado de users.status)",
          },
        },
        required: ["user_id", "status"],
      },

      WorkArea: {
        type: "object",
        description: "Área de trabajo",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único del área de trabajo",
          },
          name: {
            type: "string",
            description: "Nombre del área de trabajo",
          },
          description: {
            type: "string",
            nullable: true,
            description: "Descripción del área de trabajo",
          },
          capacity: {
            type: "integer",
            description: "Capacidad del área de trabajo",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Fecha de creación",
          },
          updated_at: {
            type: "string",
            format: "date-time",
            description: "Fecha de última actualización",
          },
        },
        required: ["id", "name", "capacity", "created_at", "updated_at"],
      },

      Company: {
        type: "object",
        description: "Empresa",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único de la empresa",
          },
          name: {
            type: "string",
            description: "Nombre único de la empresa",
          },
          description: {
            type: "string",
            nullable: true,
            description: "Descripción de la empresa",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Fecha de creación",
          },
          updated_at: {
            type: "string",
            format: "date-time",
            description: "Fecha de última actualización",
          },
        },
        required: ["id", "name", "created_at", "updated_at"],
      },

      EmployeeDetails: {
        type: "object",
        description: "Detalles específicos para usuarios empleados",
        properties: {
          employee_id: {
            type: "string",
            format: "uuid",
            description: "ID del empleado",
          },
          work_area_id: {
            type: "string",
            format: "uuid",
            nullable: true,
            description: "ID del área de trabajo",
          },
          company_id: {
            type: "string",
            format: "uuid",
            nullable: true,
            description: "ID de la empresa",
          },
        },
        required: ["employee_id"],
      },

      Attendance: {
        type: "object",
        description: "Registro de asistencia",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único del registro de asistencia",
          },
          employee_id: {
            type: "string",
            format: "uuid",
            description: "ID del empleado",
          },
          type: {
            $ref: "#/components/schemas/AttendanceType",
            description: "Tipo de asistencia (entrada o salida)",
          },
          date: {
            type: "string",
            format: "date",
            description: "Fecha del registro",
          },
          check_time: {
            type: "string",
            format: "time",
            description: "Hora del registro",
          },
        },
        required: ["id", "employee_id", "type", "date", "check_time"],
      },

      Space: {
        type: "object",
        description: "Espacio reservable",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único del espacio",
          },
          name: {
            type: "string",
            description: "Nombre del espacio",
          },
          description: {
            type: "string",
            nullable: true,
            description: "Descripción del espacio",
          },
          type: {
            $ref: "#/components/schemas/SpaceType",
            description: "Tipo de espacio",
          },
          access: {
            $ref: "#/components/schemas/AccessType",
            description: "Tipo de acceso al espacio",
          },
          capacity_min: {
            type: "integer",
            description: "Capacidad mínima",
          },
          capacity_max: {
            type: "integer",
            description: "Capacidad máxima",
          },
          allow_by_unit: {
            type: "boolean",
            description: "Permite reserva por unidad",
          },
          allow_full_room: {
            type: "boolean",
            description: "Permite reserva de sala completa",
          },
          disabled: {
            type: "boolean",
            description: "Indica si el espacio está deshabilitado",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Fecha de creación",
          },
        },
        required: [
          "id",
          "name",
          "type",
          "access",
          "capacity_min",
          "capacity_max",
          "allow_by_unit",
          "allow_full_room",
          "disabled",
          "created_at",
        ],
      },

      SpaceImage: {
        type: "object",
        description: "Imagen de espacio",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único de la imagen",
          },
          space_id: {
            type: "string",
            format: "uuid",
            description: "ID del espacio",
          },
          url: {
            type: "string",
            description: "URL de la imagen",
          },
          alt: {
            type: "string",
            nullable: true,
            description: "Texto alternativo de la imagen",
          },
          position: {
            type: "integer",
            description: "Posición de la imagen en la galería",
          },
        },
        required: ["id", "space_id", "url", "position"],
      },

      Benefit: {
        type: "object",
        description: "Beneficio o amenidad",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único del beneficio",
          },
          name: {
            type: "string",
            description: "Nombre único del beneficio",
          },
          description: {
            type: "string",
            nullable: true,
            description: "Descripción del beneficio",
          },
        },
        required: ["id", "name"],
      },

      SpaceBenefit: {
        type: "object",
        description: "Relación entre espacio y beneficio",
        properties: {
          space_id: {
            type: "string",
            format: "uuid",
            description: "ID del espacio",
          },
          benefit_id: {
            type: "string",
            format: "uuid",
            description: "ID del beneficio",
          },
        },
        required: ["space_id", "benefit_id"],
      },

      Price: {
        type: "object",
        description: "Precio de espacio",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único del precio",
          },
          space_id: {
            type: "string",
            format: "uuid",
            description: "ID del espacio",
          },
          duration: {
            $ref: "#/components/schemas/DurationUnit",
            description: "Unidad de duración",
          },
          mode: {
            $ref: "#/components/schemas/PriceMode",
            description: "Modo de precio",
          },
          amount: {
            type: "number",
            format: "float",
            description: "Monto del precio",
          },
        },
        required: ["id", "space_id", "duration", "mode", "amount"],
      },

      Reservation: {
        type: "object",
        description: "Reserva de espacio",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único de la reserva",
          },
          purchase_number: {
            type: "string",
            description: "Número único de compra",
          },
          user_id: {
            type: "string",
            format: "uuid",
            description: "ID del usuario que realiza la reserva",
          },
          space_id: {
            type: "string",
            format: "uuid",
            description: "ID del espacio reservado",
          },
          start_time: {
            type: "string",
            format: "date-time",
            description: "Hora de inicio de la reserva",
          },
          end_time: {
            type: "string",
            format: "date-time",
            description: "Hora de fin de la reserva",
          },
          people: {
            type: "integer",
            description: "Número de personas",
          },
          full_room: {
            type: "boolean",
            description: "Indica si es reserva de sala completa",
          },
          code_qr: {
            type: "string",
            description: "Código QR único para acceso",
          },
          price: {
            type: "number",
            format: "decimal",
            description: "Precio total de la reserva",
          },
          status: {
            $ref: "#/components/schemas/ReservationStatus",
            description: "Estado de la reserva",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Fecha de creación",
          },
        },
        required: [
          "id",
          "purchase_number",
          "user_id",
          "space_id",
          "start_time",
          "end_time",
          "people",
          "full_room",
          "code_qr",
          "price",
          "status",
          "created_at",
        ],
      },

      ReservationSlot: {
        type: "object",
        description: "Slot de reserva",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único del slot",
          },
          reservation_id: {
            type: "string",
            format: "uuid",
            description: "ID de la reserva",
          },
          slot_number: {
            type: "integer",
            description: "Número del slot",
          },
        },
        required: ["id", "reservation_id", "slot_number"],
      },

      PaymentTransaction: {
        type: "object",
        description: "Transacción de pago",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único de la transacción",
          },
          transaction_id: {
            type: "string",
            maxLength: 50,
            description: "ID de transacción del proveedor",
          },
          purchase_number: {
            type: "string",
            maxLength: 50,
            description: "Número único de compra",
          },
          amount: {
            type: "number",
            format: "float",
            description: "Monto de la transacción",
          },
          authorization_code: {
            type: "string",
            maxLength: 20,
            nullable: true,
            description: "Código de autorización",
          },
          status: {
            $ref: "#/components/schemas/PaymentStatus",
            description: "Estado del pago",
          },
          action_description: {
            type: "string",
            maxLength: 100,
            nullable: true,
            description: "Descripción de la acción",
          },
          card_masked: {
            type: "string",
            maxLength: 25,
            nullable: true,
            description: "Tarjeta enmascarada",
          },
          transaction_date: {
            type: "string",
            maxLength: 20,
            description: "Fecha de transacción",
          },
          error_code: {
            type: "integer",
            nullable: true,
            description: "Código de error",
          },
          error_message: {
            type: "string",
            maxLength: 100,
            nullable: true,
            description: "Mensaje de error",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Fecha de creación",
          },
          reservation_id: {
            type: "string",
            format: "uuid",
            nullable: true,
            description: "ID de la reserva asociada",
          },
          user_id: {
            type: "string",
            format: "uuid",
            nullable: true,
            description: "ID del usuario",
          },
        },
        required: [
          "id",
          "transaction_id",
          "purchase_number",
          "amount",
          "status",
          "transaction_date",
          "created_at",
        ],
      },

      ArticleCategory: {
        type: "object",
        description: "Categoría de artículo",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único de la categoría",
          },
          name: {
            type: "string",
            description: "Nombre único de la categoría",
          },
          description: {
            type: "string",
            nullable: true,
            description: "Descripción de la categoría",
          },
        },
        required: ["id", "name"],
      },

      Article: {
        type: "object",
        description: "Artículo del blog o contenido",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único del artículo",
          },
          author_id: {
            type: "string",
            format: "uuid",
            description: "ID del autor",
          },
          category_id: {
            type: "string",
            format: "uuid",
            description: "ID de la categoría",
          },
          title: {
            type: "string",
            description: "Título del artículo",
          },
          content: {
            type: "string",
            description: "Contenido del artículo",
          },
          banner: {
            type: "string",
            nullable: true,
            description: "URL de imagen banner",
          },
          resume: {
            type: "string",
            nullable: true,
            description: "Resumen del artículo",
          },
          reading_time: {
            type: "integer",
            description: "Tiempo de lectura estimado en minutos",
          },
          publication_timestamp: {
            type: "string",
            format: "date-time",
            nullable: true,
            description: "Fecha de publicación",
          },
          status: {
            $ref: "#/components/schemas/ArticleStatus",
            description: "Estado del artículo",
          },
        },
        required: [
          "id",
          "author_id",
          "category_id",
          "title",
          "content",
          "reading_time",
          "status",
        ],
      },

      NewsletterSubscriber: {
        type: "object",
        description: "Suscriptor del newsletter",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único del suscriptor",
          },
          name: {
            type: "string",
            description: "Nombre del suscriptor",
          },
          email: {
            type: "string",
            format: "email",
            description: "Email único del suscriptor",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Fecha de suscripción",
          },
        },
        required: ["id", "name", "email", "created_at"],
      },

      Product: {
        type: "object",
        description: "Producto del inventario",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único del producto",
          },
          name: {
            type: "string",
            description: "Nombre del producto",
          },
          photo_url: {
            type: "string",
            description: "URL de la foto del producto",
          },
          brand_id: {
            type: "string",
            format: "uuid",
            description: "ID de la marca",
          },
          unit_of_measure: {
            $ref: "#/components/schemas/UnitOfMeasure",
            description: "Unidad de medida",
          },
          description: {
            type: "string",
            nullable: true,
            description: "Descripción del producto",
          },
          observations: {
            type: "string",
            nullable: true,
            description: "Observaciones adicionales",
          },
          quantity: {
            type: "integer",
            description: "Cantidad disponible",
          },
        },
        required: [
          "id",
          "name",
          "photo_url",
          "brand_id",
          "unit_of_measure",
          "quantity",
        ],
      },

      ProductBrand: {
        type: "object",
        description: "Marca de producto",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único de la marca",
          },
          name: {
            type: "string",
            description: "Nombre único de la marca",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Fecha de creación",
          },
        },
        required: ["id", "name", "created_at"],
      },

      Visitor: {
        type: "object",
        description: "Visitante registrado",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "Identificador único del visitante",
          },
          dni: {
            type: "string",
            nullable: true,
            description: "Documento Nacional de Identidad",
          },
          ruc: {
            type: "string",
            nullable: true,
            description: "Registro Único de Contribuyentes",
          },
          first_name: {
            type: "string",
            description: "Nombre del visitante",
          },
          last_name: {
            type: "string",
            description: "Apellido del visitante",
          },
          phone: {
            type: "string",
            nullable: true,
            description: "Teléfono del visitante",
          },
          email: {
            type: "string",
            format: "email",
            nullable: true,
            description: "Email del visitante",
          },
          host_user_id: {
            type: "string",
            format: "uuid",
            description: "ID del usuario anfitrión",
          },
          company_id: {
            type: "string",
            format: "uuid",
            nullable: true,
            description: "ID de la empresa visitada",
          },
          space_id: {
            type: "string",
            format: "uuid",
            description: "ID del espacio visitado",
          },
          entry_time: {
            type: "string",
            format: "date-time",
            description: "Hora de entrada",
          },
          exit_time: {
            type: "string",
            format: "date-time",
            nullable: true,
            description: "Hora de salida",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Fecha de registro",
          },
          employee_details_employee_id: {
            type: "string",
            format: "uuid",
            nullable: true,
            description: "ID del empleado asociado",
          },
        },
        required: [
          "id",
          "first_name",
          "last_name",
          "host_user_id",
          "space_id",
          "entry_time",
          "created_at",
        ],
      },
    },
    responses: {
      UnauthorizedError: {
        description: "Access token missing or invalid",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "number",
                  example: 401,
                },
                message: {
                  type: "string",
                  example: "Unauthorized",
                },
                description: {
                  type: "string",
                  example: "Access token is missing or invalid",
                },
                timestamp: {
                  type: "string",
                  example: "2025-07-01T12:00:00.000Z",
                },
              },
            },
          },
        },
      },
      BadRequestError: {
        description: "Invalid request or bad input data",
      },
      NotFoundError: {
        description: "Requested resource not found",
      },
      ServerError: {
        description: "Internal server error",
      },
    },
  },
  externalDocs: {
    description: "Additional documentation",
    url: "https://labase.io/docs",
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/**/*.ts"],
  failOnErrors: true,
};

export default swaggerJSDoc(swaggerOptions);
