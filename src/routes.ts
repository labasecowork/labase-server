import { Router } from "express";

import { botRoutes } from "./modules/bot-web/presentation/routes/bot.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { spaceRouter } from "./modules/space";
import { reservationRouter } from "./modules/reservation";
import { userRouter } from "./modules/user";
import { inquiryRoutes } from "./modules/inquiry/presentation/inquiry.routes";
import { bulkEmailRoutes } from "./modules/bulk-email/presentation/bulk-email.routes";
import calendarRouter from "./modules/calendar/index";
import testingRouter from "./modules/testing_aws";
import { paymentRoutes } from "./modules/payment";
import articleRoutes from "./modules/article/presentation/routes/article.routes";
import articleCategoryRouter from "./modules/article/presentation/routes/article_category.routes";
import { attendanceRouter } from "./modules/attendance";
import { employeeRouter } from "./modules/employee";
import { newsletterRouter } from "./modules/newsletter";
import productRouter, { productBrandRouter } from "./modules/product";
import { chatbotwhatsapp } from "./modules/bot-whatsapp/presentation/routes/send_message.routes";
import { workareaRouter } from "./modules/workarea";
import { companyRouter } from "./modules/company";

import visitorRouter from "./modules/visitor";

const router = Router();
const API_VERSION = "/api/v1";

router.use(`${API_VERSION}/articles/categories`, articleCategoryRouter);
router.use(`${API_VERSION}/articles`, articleRoutes);
router.use(`${API_VERSION}/chatbot`, botRoutes);
router.use(`${API_VERSION}/chatbotwhatsapp`, chatbotwhatsapp);
router.use(`${API_VERSION}/auth`, authRouter);
router.use(`${API_VERSION}/users`, userRouter);
router.use(`${API_VERSION}/spaces`, spaceRouter);

router.use(`${API_VERSION}/reservations`, reservationRouter);

router.use(`${API_VERSION}/newsletter`, newsletterRouter);
router.use(`${API_VERSION}/bulk_email`, bulkEmailRoutes);
router.use(`${API_VERSION}/calendar`, calendarRouter);
router.use(`${API_VERSION}/form`, inquiryRoutes);
router.use(`${API_VERSION}/`, testingRouter);
router.use(`${API_VERSION}/payment`, paymentRoutes);

router.use(`${API_VERSION}/`, attendanceRouter);
router.use(`${API_VERSION}/`, employeeRouter);

router.use(`${API_VERSION}/products/brands`, productBrandRouter);
router.use(`${API_VERSION}/products`, productRouter);

router.use(`${API_VERSION}/`, workareaRouter);
router.use(`${API_VERSION}/`, companyRouter);

router.use(`${API_VERSION}/visitors`, visitorRouter);

export default router;
