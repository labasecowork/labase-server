// src/middlewares/authenticate_token/index.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env";             // ajusta alias
import { AppError } from "../../utils/errors";

export interface AuthenticatedRequest extends Request {
  user?: { id: string; email?: string; user_type: "admin" | "client" };
}

interface TokenPayload {
  id: string;
  user_type: "admin" | "client";
  //admin_role?: "superadmin" | "manager"
  email?: string;
}

export function authenticateToken(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return next(new AppError("Missing authorization header", 401));
  }

  const token = authHeader.split(" ")[1];
  if (!JWT_SECRET) {
    return next(new AppError("JWT secret not configured", 500));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload & TokenPayload;

    req.user = {
      id: payload.id,
      email: payload.email,
      user_type: payload.user_type,
    };

    return next();
  } catch {
    return next(new AppError("Invalid or expired token", 401));
  }
}
