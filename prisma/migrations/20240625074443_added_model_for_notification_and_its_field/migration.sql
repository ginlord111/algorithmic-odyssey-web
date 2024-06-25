-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "notifications";

-- CreateTable
CREATE TABLE "notifications"."Notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL,
    "fromUserImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);
