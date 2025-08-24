import { Router } from "express";
import multer from "multer";
import { uploadTest } from "./testing_aws.controller";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
/**
 * @openapi
 * /api/v1/test:
 *   post:
 *     summary: Subir archivo de prueba a S3 (carpeta "public")
 *     tags:
 *       - Testing AWS
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo a subir
 *     responses:
 *       201:
 *         description: Archivo subido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Archivo subido correctamente
 *                 path:
 *                   type: string
 *                   example: /api/v1/test
 *                 data:
 *                   type: object
 *                   properties:
 *                     key:
 *                       type: string
 *                       example: public/uuid.jpg
 *                     url:
 *                       type: string
 *                       example: https://bucket.s3.us-east-2.amazonaws.com/public/uuid.jpg
 *       400:
 *         description: No se subió ningún archivo
 *       500:
 *         description: Error interno del servidor
 */

router.post("/", upload.single("file"), uploadTest);

export { router as testingRoutes };
