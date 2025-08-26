import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger";
import routes from "./routes";
// import https from "https";
import http from "http";
import { initSocket } from "./config/socket";
import { redisClient } from "./config/redis";
import { APP_URL, PORT } from "./config/env";
import { displayWelcomeMessage } from "./utils";
import { customMorganFormat } from "./utils/cli";
import { multerErrorHandler } from "./middlewares/multer_error_handler/multer_error_handler";
import { startWhatsAppBot } from "./modules/chatbot/presentation/bot/whatsapp.bot";
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use(routes);

// Multer error handler
app.use(multerErrorHandler as express.ErrorRequestHandler);

// Test route
app.get("/ping", (_, res) => res.send("pong"));

// Start server
const main = async () => {
  // ⬇️ Inicia Redis (si falla, registra y no cae el proceso)
  try {
    await redisClient.connect();
  } catch (e) {
    console.error("[Redis] No conectó:", e);
  }

  // // ⬇️ INICIA EL BOT AQUÍ, UNA SOLA VEZ
  try {
    await startWhatsAppBot();
  } catch (e) {
    console.error("[WhatsApp] No inició:", e);
  }

  server.listen(PORT, () => {
    displayWelcomeMessage(appUrl);
    console.log(`[HTTP] Server on :${PORT}`);
    console.log(
      "[WhatsApp] Si usas PM2, mira los logs para ver el QR: pm2 logs labase-server",
    );
  });
};

main();
