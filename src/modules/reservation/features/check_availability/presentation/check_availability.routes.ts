// src/modules/reservation/features/check_availability/presentation/routes/check_availability.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { CheckAvailabilityController } from "./check_availability.controller";

const router = Router();
const controller = new CheckAvailabilityController();

router.get("/", asyncHandler(controller.handle.bind(controller)));

export { router as checkAvailabilityRoutes };
