// src/modules/user/index.ts
import { Router } from "express";
import { editProfileRoutes } from "./features/edit_profile";

export const userRouter = Router();

// Resultado final: PUT users/profile
userRouter.use("/profile", editProfileRoutes);

export default userRouter;
