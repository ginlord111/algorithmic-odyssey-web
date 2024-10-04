-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "kekw";

-- AlterTable
ALTER TABLE "notifications"."Notifications" ALTER COLUMN "resourceId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "kekw"."Kekw" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Kekw_pkey" PRIMARY KEY ("id")
);
