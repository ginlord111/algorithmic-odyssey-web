/*
  Warnings:

  - Made the column `fileUrl` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileUrlDownload` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileType` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "classroom"."Activity" ALTER COLUMN "fileUrl" SET NOT NULL,
ALTER COLUMN "fileUrlDownload" SET NOT NULL,
ALTER COLUMN "fileType" SET NOT NULL;
