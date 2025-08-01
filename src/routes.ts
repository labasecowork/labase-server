import { Router } from "express";

import botRoutes from "./modules/bot/presentation/routes/bot.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { spaceRouter } from "./modules/space";
import { reservationRouter } from "./modules/reservation";
import { userRouter } from "./modules/user";
import { publicContactRoutes } from "./modules/public_contact/presentation/public_contact.routes";
import emailRoutes from "./modules/bulk_email/presentation/bulk_email.routes";
import calendarRouter from "./modules/calendar/index";
import testingRouter from "./modules/testing_aws";
import { paymentRoutes } from "./modules/payment";
import articleRoutes from "./modules/article/presentation/routes/article.routes";
import articleCategoryRouter from "./modules/article/presentation/routes/article_category.routes";
import { attendanceRouter } from "./modules/attendance";
import { employeeRouter } from "./modules/employee";
import { newsletterRouter } from "./modules/newsletter";

const router = Router();
const API_VERSION = "/api/v1";

router.use(`${API_VERSION}/articles/categories`, articleCategoryRouter);
router.use(`${API_VERSION}/articles`, articleRoutes);
router.use(`${API_VERSION}/chatbot`, botRoutes);
router.use(`${API_VERSION}/auth`, authRouter);
router.use(`${API_VERSION}/users`, userRouter);
router.use(`${API_VERSION}/spaces`, spaceRouter);
router.use(`${API_VERSION}/`, reservationRouter);
router.use(`${API_VERSION}/newsletter`, newsletterRouter);
router.use(`${API_VERSION}/bulk_email`, emailRoutes);
router.use(`${API_VERSION}/calendar`, calendarRouter);
router.use(`${API_VERSION}/form`, publicContactRoutes);
router.use(`${API_VERSION}/`, testingRouter);
router.use(`${API_VERSION}/payment`, paymentRoutes);
router.use(`${API_VERSION}/`, attendanceRouter);
router.use(`${API_VERSION}/`, employeeRouter);
export default router;
