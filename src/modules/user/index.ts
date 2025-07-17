// src/modules/user/index.ts
import { Router } from "express";
import { editProfileRoutes } from "./features/edit_profile";
import { getProfileRoutes } from "./features/get_profile/presentation/get_profile.routes";

export const userRouter = Router();

// Resultado final: PUT users/profile
userRouter.use("/profile", editProfileRoutes);
userRouter.use("/profile", getProfileRoutes);

export default userRouter;
