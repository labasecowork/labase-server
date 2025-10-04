import { Router } from "express";
import reminderRoutes from "./features";

const router = Router();

router.use("/reminders", reminderRoutes);

export default router;
