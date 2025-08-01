// src/utils/error_handler/index.ts
import { Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

import { HttpStatusCodes } from "../../constants";
import { buildHttpResponse } from "../build_http_response";
import { AppError } from "../errors";

export function handleZodError(error: ZodError, req: Request) {
  const message = error.errors[0]?.message ?? "Validation error";
  return buildHttpResponse(HttpStatusCodes.BAD_REQUEST.code, message, req.path);
}

export const handleServerError = (
  res: Response,
  req: Request,
  error: unknown
) => {
  // ─────────── Zod ───────────
  if (error instanceof ZodError) {
    console.error("ZodError", error);
    const zodError = handleZodError(error, req);
    return res.status(zodError.status).json(zodError);
  }

  // ─────────── Dominio ───────────
  if (error instanceof AppError) {
    console.error("AppError", error);
    return res
      .status(error.statusCode)
      .json(buildHttpResponse(error.statusCode, error.message, req.path));
  }

  // ─────────── Prisma Validation ───────────
  if (
    error instanceof Prisma.PrismaClientValidationError ||
    (error instanceof Error && error.name === "PrismaClientValidationError")
  ) {
    console.error("PrismaClientValidationError", error);
    return res
      .status(400)
      .json(
        buildHttpResponse(
          400,
          "Bad Request",
          req.path,
          undefined,
          error.message
        )
      );
  }

  // ─────────── Prisma Known Request ───────────
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    (error instanceof Error && error.name === "PrismaClientKnownRequestError")
  ) {
    console.error("PrismaClientKnownRequestError", error);
    return res
      .status(400)
      .json(
        buildHttpResponse(
          400,
          (error as Prisma.PrismaClientKnownRequestError).code,
          req.path,
          undefined,
          JSON.stringify((error as any).meta, null, 2)
        )
      );
  }

  // ─────────── Fallback 500 ───────────
  console.error("Fallback 500", error);
  return res
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code)
    .json(
      buildHttpResponse(
        HttpStatusCodes.INTERNAL_SERVER_ERROR.code,
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : JSON.stringify(error, null, 2),
        req.path
      )
    );
};
