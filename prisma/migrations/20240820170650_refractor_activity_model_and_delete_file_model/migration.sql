/*
  Warnings:

  - You are about to drop the column `fileId` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "classroom"."Activity" DROP CONSTRAINT "Activity_fileId_fkey";

-- AlterTable
ALTER TABLE "classroom"."Activity" DROP COLUMN "fileId",
ADD COLUMN     "fileUrl" TEXT,
ADD COLUMN     "fileUrlDownload" TEXT;

-- DropTable
DROP TABLE "classroom"."File";
