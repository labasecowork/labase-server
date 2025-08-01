import { Request, Response } from "express";
import { uploadFile } from "../../../infrastructure/aws";
import { HttpStatusCodes } from "../../../constants/http_status_codes";
import { buildHttpResponse } from "../../../utils/build_http_response";
import { handleServerError } from "../../../utils/error_handler";

export const uploadTest = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST.code)
        .json({ message: "No file uploaded" });
    }

    const { key, url } = await uploadFile(req.file, "public");

    return res.status(HttpStatusCodes.CREATED.code).json(
      buildHttpResponse(
        HttpStatusCodes.CREATED.code,
        "✅ Archivo subido correctamente",
        req.path,
        { key, url }
      )
    );
  } catch (error) {
    return handleServerError(res, req, error);
  }
};
