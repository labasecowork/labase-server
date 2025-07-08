-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('admin', 'client');

-- CreateEnum
CREATE TYPE "admin_role" AS ENUM ('superadmin', 'manager');

-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('active', 'suspended', 'pending');

-- CreateEnum
CREATE TYPE "notification_type" AS ENUM ('INFO', 'SUCCESS', 'ERROR', 'ALERT');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_type" "user_type",
    "profile_image" TEXT,
    "phone" TEXT,
    "birth_date" DATE,
    "gender" TEXT,
    "creation_timestamp" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_details" (
    "client_id" INTEGER NOT NULL,
    "status" "user_status" NOT NULL,

    CONSTRAINT "client_details_pkey" PRIMARY KEY ("client_id")
);

-- CreateTable
CREATE TABLE "admin_details" (
    "admin_id" INTEGER NOT NULL,
    "role" "admin_role" NOT NULL,
    "notes" TEXT,

    CONSTRAINT "admin_details_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "user_details" (
    "user_id" INTEGER NOT NULL,
    "status" "user_status" NOT NULL,

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "senderId" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "notification_type" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "client_details" ADD CONSTRAINT "client_details_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_details" ADD CONSTRAINT "admin_details_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
