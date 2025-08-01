import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger";
import routes from "./routes";
import http from "http";
import { initSocket } from "./config/socket";
import { redisClient } from "./config/redis";
import { APP_URL, PORT } from "./config/env";
import { displayWelcomeMessage } from "./utils";
import { customMorganFormat } from "./utils/cli";
import { multerErrorHandler } from "./middlewares/multer_error_handler/multer_error_handler";

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
  await redisClient.connect();
  server.listen(PORT, () => {
    displayWelcomeMessage(appUrl);
  });
};

main();
