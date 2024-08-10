/*
  Warnings:

  - You are about to drop the column `text` on the `ClassroomAnnouncement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "classroom"."ClassroomAnnouncement" DROP COLUMN "text",
ADD COLUMN     "content" JSONB;
