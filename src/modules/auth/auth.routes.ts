//src/modules/auth/auth.routes.ts
import { Router } from "express";
import { loginRouter, loginGoogleRouter } from "./features/login";
import {
  requestRegistrationRouter,
  verifyCodeRegistrationRouter,
  resendRegistrationRouter,
} from "./features/registration";
import {
  confirmPasswordResetRouter,
  requestPasswordResetRouter,
  verifyCodePasswordResetRouter,
} from "./features/password_reset";

export const authRouter = Router();

// Registration
authRouter.use("/register", requestRegistrationRouter);
authRouter.use("/register", verifyCodeRegistrationRouter);
authRouter.use("/register", resendRegistrationRouter);

// Login
authRouter.use("/login", loginRouter);
authRouter.use("/login", loginGoogleRouter);

// Password Reset
authRouter.use("/password-reset", requestPasswordResetRouter);
authRouter.use("/password-reset", verifyCodePasswordResetRouter);
authRouter.use("/password-reset", confirmPasswordResetRouter);
