import { Router } from "express";

import botRoutes          from "./modules/bot/presentation/routes/bot.routes";
import { authRouter }     from "./modules/auth/auth.routes";
import { spaceRouter }    from "./modules/space";
import { reservationRouter } from "./modules/reservation";
import { userRouter }     from "./modules/user";
import newsletterRoutes from "./modules/newsletter/presentation/newsletter.routes";
import emailRoutes from "./modules/email/presentation/email.routes";
import calendarRouter from "./modules/calendar/index";

const router = Router();
const API_VERSION = "/api/v1";

router.use(`${API_VERSION}/chatbot`,     botRoutes);
router.use(`${API_VERSION}/auth`,        authRouter);
router.use(`${API_VERSION}/users`,       userRouter);
router.use(`${API_VERSION}/spaces`,      spaceRouter);
router.use(`${API_VERSION}/reservations`, reservationRouter);
router.use(`${API_VERSION}/newsletter`, newsletterRoutes);
router.use(`${API_VERSION}/bulk_email`, emailRoutes);
router.use(`${API_VERSION}/calendar`, calendarRouter);
export default router;
