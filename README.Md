# 📘 LaBase Backend – Developer Documentation

## ✨ Description

LaBase Backend is the core service that manages reservations, appointments, clients, and related business logic. It uses PostgreSQL as the main datastore and provides a robust API built on Node.js, Express, and TypeScript following **Clean Architecture with Vertical Slices**.

This approach ensures clear separation of concerns, high scalability, and maintainability over time.

---

## 🛠 Technologies Used

- **Node.js** (version 18 or higher) 
- **Express** (web framework) 
- **TypeScript** (static typing) 
- **Prisma ORM** (PostgreSQL database mapping) 
- **Zod** (data validation) 
- **Axios** (HTTP client) 
- **Socket.IO** (real-time events) 
- **Bcrypt** (password hashing) 
- **Swagger** (interactive API documentation)
- **Redis** (caching and session storage) 
- **AWS S3** (planned for file storage)
- **dayjs** (date/time formatting and manipulation) 
- **date-fns** (programmatic date handling)
- **nanoid** (unique ID generation)
- **uuid** (universally unique identifiers) 
- **Multer** (file upload handling)
- **Nodemailer** (email sending)
- **dotenv** (environment variables loader) 
- **EJS** (email templating)
- **Morgan** (HTTP logger middleware)
---

## ⚙️ Requirements

- Node.js **v18 or higher** (recommended v20+)
- PostgreSQL (installed locally or via Docker)
- Redis (local or hosted)
- Docker (optional, for containerized environments)

---

## 🚀 Installation and Setup

### 1️⃣ Clone the repository

```bash
git clone <REPOSITORY_URL>
cd labase-service
