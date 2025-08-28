// src/modules/chatbot/presentation/controllers/send_message.controller.ts
import { asyncHandler } from "../../../../middlewares/async_handler";
import { buildHttpResponse } from "../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../constants/http_status_codes";
import { SendMessageSchema } from "../../domain/send_message.schema";
import { sendText } from "../../data/repository/whatsapp.repository";

export const sendMessageController = asyncHandler(async (req, res) => {
  const dto = SendMessageSchema.parse(req.body);
  await sendText(dto.to, dto.text);

  return res.status(HttpStatusCodes.OK.code).json(
    buildHttpResponse(HttpStatusCodes.OK.code, "Sent", req.path, {
      delivered: true,
    }),
  );
});
