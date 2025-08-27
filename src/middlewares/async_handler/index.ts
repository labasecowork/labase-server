//src/middlewares/async_handler/index.ts
import { Request, Response, NextFunction } from "express";
import { buildHttpResponse } from "../../utils/build_http_response";
import { HttpStatusCodes } from "../../constants/http_status_codes";

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(
      (error: any) => {
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR.code).json(
          buildHttpResponse(HttpStatusCodes.INTERNAL_SERVER_ERROR.code, error.message, req.path)
        );
      }
    );
  };
};
