import { Router } from "express";
import { testingRoutes } from "./presentation/testing_aws.routes";

export const testingRouter = Router();

testingRouter.use("/test", testingRoutes);   

export default testingRouter;
    