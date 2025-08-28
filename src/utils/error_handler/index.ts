// src/utils/error_handler/index.ts
import { Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { HttpStatusCodes } from "../../constants";
import { buildHttpResponse } from "../build_http_response";
import { AppError } from "../errors";

export function handleZodError(error: ZodError, req: Request) {
  const firstMessage = error.errors[0]?.message ?? "Validation error";
  return buildHttpResponse(
    HttpStatusCodes.BAD_REQUEST.code,
    firstMessage,
    req.path,
    undefined,
    {
      issues: error.errors.map((e) => ({
        path: e.path.join("."),
        code: e.code,
        message: e.message,
      })),
    },
  );
}

export const handleServerError = (
  res: Response,
  req: Request,
  error: unknown,
) => {
  if (error instanceof ZodError) {
    const payload = handleZodError(error, req);
    return res.status(payload.status).json(payload);
  }

  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json(buildHttpResponse(error.statusCode, error.message, req.path));
  }

  if (
    error instanceof Prisma.PrismaClientValidationError ||
    (error instanceof Error && error.name === "PrismaClientValidationError")
  ) {
    return res.status(400).json(
      buildHttpResponse(400, "Bad Request", req.path, undefined, {
        details: error.message,
      }),
    );
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    (error instanceof Error && error.name === "PrismaClientKnownRequestError")
  ) {
    return res
      .status(400)
      .json(
        buildHttpResponse(
          400,
          (error as Prisma.PrismaClientKnownRequestError).code,
          req.path,
          undefined,
          (error as any).meta ?? undefined,
        ),
      );
  }

  return res
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
    .json(
      buildHttpResponse(
        HttpStatusCodes.INTERNAL_SERVER_ERROR.code,
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : error instanceof Error
            ? (error.stack ?? error.message)
            : String(error),
        req.path,
      ),
    );
};
