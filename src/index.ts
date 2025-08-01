import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger";
import routes from "./routes";
import https from "https";
import { initSocket } from "./config/socket";
import { redisClient } from "./config/redis";
import { APP_URL, PORT } from "./config/env";
import { displayWelcomeMessage, getDirname } from "./utils";
import { customMorganFormat } from "./utils/cli";
import { multerErrorHandler } from "./middlewares/multer_error_handler/multer_error_handler";
import fs from "fs";
import path from "path";

const __dirname = getDirname(import.meta.url);
const httpsOptions: https.ServerOptions = {
  key: fs.readFileSync(path.join(__dirname, "./cert/192.168.1.6-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./cert/192.168.1.6.pem")),
};
const app = express();
const server = https.createServer(httpsOptions, app);

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
  await redisClient.connect();
  server.listen(PORT, () => {
    displayWelcomeMessage(appUrl);
  });
};

main();
