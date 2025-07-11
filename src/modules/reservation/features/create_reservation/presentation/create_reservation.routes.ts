// src/modules/reservation/features/create_reservation/presentation/create_reservation.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CreateReservationController } from "./create_reservation.controller";

const router = Router();
const controller = new CreateReservationController();

router.post("/", authenticateToken, asyncHandler(controller.handle.bind(controller)));

export { router as createReservationRoutes };
