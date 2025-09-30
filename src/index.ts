import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { mountSwagger } from "./docs/swagger";
import routes from "./routes";
import http from "http";
// import https from "https";
import { initSocket } from "./config/socket";
import { redisClient } from "./config/redis";
import { APP_URL, PORT } from "./config/env";
import { displayWelcomeMessage } from "./utils";
import { customMorganFormat } from "./utils/cli";
import { multerErrorHandler } from "./middlewares/multer_error_handler/multer_error_handler";
import { startWhatsAppBot } from "./modules/bot-whatsapp/application/bot/whatsapp.bot";
import { globalErrorHandler } from "./middlewares/global_error_handler";
import { buildHttpResponse } from "./utils/build_http_response";
import { HttpStatusCodes } from "./constants/http_status_codes";
/*import fs from "fs";
import path from "path";

const __dirname = getDirname(import.meta.url);
 const httpsOptions: https.ServerOptions = {
  key: fs.readFileSync(path.join(__dirname, "./cert/192.168.1.6-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./cert/192.168.1.6.pem")),
}; */
const app = express();
const server = http.createServer(app);

// App URL fallback
const appUrl = `${APP_URL}` || `http://localhost:${PORT}`;

// Initialize sockets
initSocket(server);

// Middlewares
app.use(morgan(customMorganFormat));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(mountSwagger));

// API Routes
app.use(routes);

// Multer error handler
app.use(multerErrorHandler as express.ErrorRequestHandler);

// Test route
app.get("/ping", (_, res) => res.send("pong"));

// 404
app.use((req, res) => {
  return res
    .status(HttpStatusCodes.NOT_FOUND.code)
    .json(
      buildHttpResponse(
        HttpStatusCodes.NOT_FOUND.code,
        "Route not found",
        req.path
      )
    );
});

// Global Error Handler
app.use(globalErrorHandler);

// Start server
const main = async () => {
  // Redis
  try {
    await redisClient.connect();
  } catch (e) {
    console.error("[Redis] No conectó:", e);
  }

  // Whatsapp bot
  // try {
  //   await startWhatsAppBot();
  //   console.log(
  //     "[WhatsApp] Bot inicializado (si es primera vez, revisa el QR en logs)"
  //   );
  // } catch (e) {
  //   console.error("[WhatsApp] No inició:", e);
  // }

  server.listen(PORT, () => {
    displayWelcomeMessage(appUrl);
    console.log(`[HTTP] Server on :${PORT}`);
    console.log(
      "[WhatsApp] Mirar los logs para ver el QR: pm2 logs labase-server"
    );
  });
};

main();
