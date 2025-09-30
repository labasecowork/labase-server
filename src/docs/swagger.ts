// src/docs/swagger.ts
import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import basicAuth from "express-basic-auth";
import helmet from "helmet";
import type { Express } from "express";

const isProd = process.env.NODE_ENV === "production";
const isStaging = process.env.NODE_ENV === "staging";

const servers: OAS3Definition["servers"] = [
  !isProd && !isStaging
    ? { url: "http://localhost:3000", description: "Local" }
    : undefined,
  isStaging
    ? { url: "https://api-staging.labase.io/v1", description: "Staging" }
    : undefined,
  isProd
    ? { url: "https://api.labase.io/v1", description: "Production" }
    : undefined,
].filter(Boolean) as OAS3Definition["servers"];

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.3",
  info: {
    title: "LaBase API",
    version: "1.0.0",
    description:
      "API services for the LaBase platform. Public documentation without sensitive data. All protected endpoints require authentication.",
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
  servers,
  tags: [
    { name: "Space", description: "Workspace resources" },
    { name: "Reservation", description: "Reservations & scheduling" },
    { name: "Payment", description: "Payment sessions & callbacks" },
    { name: "User", description: "Authentication & profiles" },
    { name: "Lawyer", description: "Legal services (ArxaTEC)" },
  ],
  externalDocs: {
    description: "Additional documentation",
    url: "https://labase.io/docs",
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Send your JWT as: Bearer <token>",
      },
      // Si también usas API Keys en integraciones, descomenta:
      // ApiKeyAuth: { type: "apiKey", in: "header", name: "x-api-key" },
    },
    schemas: {
      // Envoltorio estándar de respuesta (buildHttpResponse)
      ApiResponse: {
        type: "object",
        properties: {
          status: { type: "integer", example: 200 },
          message: { type: "string", example: "Success" },
          path: { type: "string", example: "/api/v1/space/create" },
          timestamp: { type: "string", format: "date-time" },
          data: { type: "object" }, // cada endpoint define su `data` con allOf/oneOf
        },
        required: ["status", "message", "path", "timestamp"],
        additionalProperties: false,
      },
      ErrorResponse: {
        type: "object",
        properties: {
          status: { type: "integer", example: 400 },
          error: { type: "string", example: "Bad Request" },
          message: { type: "string", example: "Validation error" },
          path: { type: "string", example: "/api/v1/space/create" },
          timestamp: { type: "string", format: "date-time" },
          details: { type: "object", nullable: true }, // p.ej. zod.flatten()
        },
        required: ["status", "error", "message", "path", "timestamp"],
        additionalProperties: false,
      },

      // DTOs genéricos de ejemplo (puedes extender por módulo)
      PaginationQuery: {
        type: "object",
        properties: {
          page: { type: "integer", minimum: 1, example: 1 },
          limit: { type: "integer", minimum: 1, maximum: 100, example: 10 },
          q: { type: "string", nullable: true, example: "meeting" },
        },
        additionalProperties: false,
      },
      IdParam: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            example: "1c7fe2f7-1d6d-4d9a-8e8d-8a3b9c1a8e11",
          },
        },
        required: ["id"],
        additionalProperties: false,
      },
    },
    responses: {
      Unauthorized: {
        description: "Missing or invalid access token",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      BadRequest: {
        description: "Invalid request or bad input data",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      NotFound: {
        description: "Requested resource not found",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      TooManyRequests: {
        description: "Rate limit exceeded",
        headers: {
          "Retry-After": {
            schema: { type: "string", example: "60" },
            description: "Seconds until the next allowed request.",
          },
        },
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
      ServerError: {
        description: "Internal server error (no internal details)",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
          },
        },
      },
    },
  },
  // Seguridad por defecto (se puede sobreescribir por endpoint)
  security: [{ BearerAuth: [] }],
};

const swaggerOptions: OAS3Options = {
  definition: swaggerDefinition,
  // Solo rutas; evita escanear services/repos (menor superficie y más rápido)
  apis: ["./src/modules/**/*.route.ts"],
  // Si una anotación JSDoc está mal formada, falla en CI:
  failOnErrors: true,
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Montaje seguro de Swagger UI
export function mountSwagger(app: Express) {
  app.use(
    "/docs",
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "script-src": ["'self'", "'unsafe-inline'"], // swagger-ui requiere inline
          "style-src": ["'self'", "'unsafe-inline'"],
          "img-src": ["'self'", "data:"],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
    ...(isProd
      ? [
          basicAuth({
            users: {
              [process.env.SWAGGER_USER || "docs"]:
                process.env.SWAGGER_PASS || "change-me",
            },
            challenge: true,
          }),
        ]
      : []),
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        // En prod, UI solo lectura (sin Try-It-Out)
        supportedSubmitMethods: isProd
          ? []
          : ["get", "post", "put", "patch", "delete"],
        displayRequestDuration: true,
        docExpansion: "list",
        defaultModelsExpandDepth: 1,
        defaultModelExpandDepth: 1,
      },
    })
  );
}
