import { Router } from "express";

import botRoutes          from "./modules/bot/presentation/routes/bot.routes";
import { authRouter }     from "./modules/auth/auth.routes";
import { spaceRouter }    from "./modules/space";
import { reservationRouter } from "./modules/reservation";
import { userRouter }     from "./modules/user";

const router = Router();
const API_VERSION = "/api/v1";

router.use(`${API_VERSION}/chatbot`,     botRoutes);
router.use(`${API_VERSION}/auth`,        authRouter);
router.use(`${API_VERSION}/users`,       userRouter);
router.use(`${API_VERSION}/spaces`,      spaceRouter);
router.use(`${API_VERSION}/reservations`, reservationRouter);

export default router;
