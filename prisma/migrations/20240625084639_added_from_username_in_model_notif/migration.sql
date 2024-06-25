/*
  Warnings:

  - Added the required column `fromUsername` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications"."Notifications" ADD COLUMN     "fromUsername" TEXT NOT NULL,
ALTER COLUMN "isRead" SET DEFAULT false;
