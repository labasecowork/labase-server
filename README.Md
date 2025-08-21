📘 Grupo Aguirre Backend – Developer Documentation
✨ Description

El backend gestiona reservas, citas legales, clientes y la lógica central de negocio del Grupo Aguirre Abogados Perú.
Se basa en Node.js, Express y TypeScript, aplicando Clean Architecture con Vertical Slices para asegurar una separación clara de responsabilidades, escalabilidad y mantenibilidad a largo plazo.

Incluye un asistente legal de WhatsApp que combina whatsapp-web.js (cliente de WhatsApp Web) con Gemini (API de Google Generative Language) para ofrecer respuestas automáticas con contexto legal de Perú, misión, visión y servicios del estudio.

🛠 Technologies Used
-Node.js (v18 o superior)
-Express (framework web)
-TypeScript (tipado estático)
-Prisma ORM (mapeo con PostgreSQL)
-Zod (validación de datos)
-Axios (cliente HTTP)
-Socket.IO (eventos en tiempo real)
-Bcrypt (hash de contraseñas)
-Swagger (documentación API interactiva)
-Redis (cache y sesiones temporales)
-AWS S3 (almacenamiento de archivos)
-dayjs y date-fns (manejo de fechas)
-nanoid y uuid (identificadores únicos)
-Multer (subida de archivos)
-Nodemailer (envío de correos)
-dotenv (variables de entorno)
-EJS (templates de email)
-Morgan (logger HTTP)
-whatsapp-web.js (integración WhatsApp Business con cliente local)
-qrcode-terminal (render QR para vincular WhatsApp)
-Google Gemini API (IA generativa para el chatbot legal)

⚙️ Requirements
-Node.js v18 o superior (recomendado v20+)
-PostgreSQL (local o en Docker)
-Redis (local)
-Docker (opcional, para entornos containerizados)
-Chromium/Chrome con flags --no-sandbox (requerido por whatsapp-web.js en servidores VPS sin GUI)

🚀 Installation and Setup
1. Clonar el repositorio
git clone <REPOSITORY_URL>
cd aguirre-service

2. Instalar dependencias
npm install

3. Configurar variables de entorno
Crea un archivo .env basado en .env.example. Incluye:

DATABASE_URL=postgresql://user:password@localhost:5432/aguirre_db
REDIS_URL=redis://localhost:6379
API_KEY_GEMINI=tu_api_key
PORT=3001
APP_URL=http://localhost:3001

4. Levantar el servidor
npm run dev

* Al iniciar, se mostrará en consola el QR de WhatsApp (usar cámara del teléfono para vincular) *

🤖 WhatsApp Bot
-Cliente: whatsapp-web.js con LocalAuth.
-IA: Google Gemini con contexto legal del Grupo Aguirre Abogados Perú.
-Atención: 100% remota, sin necesidad de acudir a oficina física.
-Flujo de citas: El bot puede recibir datos del cliente y generar citas provisionales (pendientes de confirmación).
